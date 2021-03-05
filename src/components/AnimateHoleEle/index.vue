<template>
  <Lottie :options="options"
          renderer="svg"
          :play="play"
          @animCreated="handleAnimation"
  />
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, computed, watch, onMounted, isRef} from 'vue'
import Lottie from '/@/components/Lottie/index.vue'

import Base64 from 'base-64'
import axios from "axios";

export default defineComponent({
  props: {
    cardData: Object,
    imgStyle: Object,
    selfPage: Number,
    info: Object,
    pageStatus: String,
    elementDelay: Number,
    inactiveShow: Boolean
  },
  components: {
    Lottie,
  },
  setup(props, ) {
    let delayTimeId: any = null
    const state = reactive({
      anim: null,
      content: null,
      options: {},
      longPageStatus: false,
    })

    const play = computed(() => {
      if(!props.pageStatus || "leaving" === props.pageStatus && !props.inactiveShow) {
        state.anim && state.anim.stop()
        clearInterval(delayTimeId)
        return 'stop'
      }else {
        if(!props.inactiveShow) {
          playAnimate()
        }else {
          clearInterval(delayTimeId)
          state.anim && state.anim.stop()
        }
        return 'play'
      }
    })
    watch(() => props.info, (infoVal: object, oldInfoVal: object) => {
      const {playSpeed = '1', delay, fonts, path, isLoop} = infoVal
      if(fonts !== oldInfoVal.fonts){
        loadFonts()
      }
      if(!(oldInfoVal.path === path && oldInfoVal.isLoop === isLoop)) {
        getOptions()
      }
      if(!(oldInfoVal.playSpeed === playSpeed && oldInfoVal.delay === delay)) {
        state.anim && state.anim.stop()
        playAnimate()
      }
    })
    const getOptions = async () => {
      let o = '', m = ''
      if(props.info.path){
        o = await axios.get(props.info.path).then((res) => {
          return JSON.parse(Base64.decode(res.data))
        })
      }
      if(props.info.content) {
        m = JSON.parse(Base64.decode(props.info.content))
      }
      state.options = {
        animationData: o && o.default || o || m,
        loop: props.info.isLoop,
        autoplay: false,
      }
    }

    const playAnimate = () => {
      const info = (props.info || {})
      const {delay = 0, playSpeed = '1',} = info
      state.anim && (delayTimeId = setTimeout(() => {
        state.anim.setSpeed(+playSpeed)
        state.anim.play()
        clearTimeout(delayTimeId)
      }, (+delay + (+props.elementDelay || 0) || 0)))
    }

    const handleAnimation = (anim) => {
      state.anim = toRefs(anim)
      if("activePage" === props.pageStatus) {
        playAnimate()
      }
    }
    // methods
    const getFontName = (url: string): string => {
      if(!url) return ''
      return url.split("/").pop().split(".")[0]
    }
    const loadFonts = (fontUrl: string): void => {
      if(!fontUrl) return ''
      if('fonts' in document) {
        const fontName = getFontName(fontUrl)
        const font = new FontFace(fontName, `url('${fontUrl}') format('woff2')`)
        font && font.load().then((res) => {
          document.fonts.add(res)
        })
      }
    }

    onMounted(() => {
      getOptions()
    })
    return {
      ...toRefs(state),
      handleAnimation,
      play,
    }
  }
})
</script>