<template>
  <Lottie :options="options"
          renderer="svg"
          :play="play"
          @animCreated="handleAnimation"
  />
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, computed, watch , onMounted} from 'vue'
import Lottie from '/@/components/Lottie/index.vue'

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
  setup({cardData, imgStyle, selfPage, info, pageStatus, elementDelay, inactiveShow}, ) {
    const state = reactive({
      anim: null,
      delayTimeId: null,
      content: null,
      options: {},
      longPageStatus: false,
    })

    const play = computed(() => {
      return window.isLongPage ?
          state.longPageStatus ? "lpPlay" : "lpStop"
          : !pageStatus || "leaving" === pageStatus && !inactiveShow ?
              (state.anim && state.anim.stop(),
                  "stop") : (playAnimate(),
                  "play")
    })
    watch(info, (infoVal: object, oldInfoVal: object) => {
      const {playSpeed = '1', delay, fonts, path, isLoop} = infoVal
      if(fonts !== oldInfoVal.fonts){
        loadFonts()
      }
      if(!(oldInfoVal.path === path && oldInfoVal.isLoop === isLoop)) {
        getOptions()
      }
      if(!(oldInfoVal.playSpeed === playSpeed && oldInfoVal.delay === delay)) {
        if(state.anim) {
          state.anim.stop()
        }
        playAnimate()
      }
    })
    const getOptions = () => {

    }

    const playAnimate = () => {
      const {delay = 0, playSpeed = '1', } = elements
      state.anim && (state.delayTimeId = setTimeout(() => {
        state.anim.setSpeed(playSpeed)
        state.anim.play()
        clearTimeout(t.delayTimeId)
      }, (+delay+ (elementDelay || 0)|| 0)))
    }
    const handleAnimation = (anim) => {
      state.value.anim = anim
      ("activePage" === pageStatus || state.longPageStatus) && playAnimate()
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