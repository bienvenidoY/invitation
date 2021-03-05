<template>
  <div class="animate-ele-wrap"
       :class="{'text-wrap': info.type === 'text' && info.smallFontPath}"
       :style="eleWrapStyle"
  >
    <div :class="info.type === 'animate' ? 'animate-ele-no-event' : 'animate-ele'"
         :data-ele="info.id"
         :style="eleStyle">
      <MapEle v-if="info.type === 'map' "
              :card-data="cardData"
              :self-page="selfPage"
              :img-style="imgStyle" />
      <AnimateHoleEle v-else-if="info.type === 'animate'"
                      :card-data="cardData"
                      :self-page="selfPage"
                      :info="info"
                      :pageStatus="pageStatus"
                      :elementDelay="elementDelay"
                      :inactiveShow="inactiveShow"
      />
      <TextHoleEle v-else-if="info.type && info.content && info.smallFontPath"
                   :wrap-style="imgStyle"
                   :paging="paging"
                   :fontList="fontList"
                   :info="info" />

      <img v-else
           class="animate-img"
           :data-ele="info.id"
           :style="imgStyle"
           @click.native="paging"
           v-if="info.img"
           :src="info.img">
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, computed} from 'vue'
import MapEle from '/@/components/MapEle/index.vue'
import AnimateHoleEle from '/@/components/AnimateHoleEle/index.vue'
import TextHoleEle from '/@/components/TextHoleEle/index.vue'

import { pxToRem, addMs } from '/@/utils/tool'

export default defineComponent({
  name: 'AnimateEle',
  components: {
    MapEle,
    AnimateHoleEle,
    TextHoleEle,
  },
  props: {
    info: Object,
    cardData: Object,
    selfPage: Number,
    pageId: [String, Number],
    pageStatus: String,
    toNextPage: Function,
    elementDelay: Number,
    inactiveShow: Boolean,
    fontList: Array
  },
  emits: {
    notifyVideoInfo(element) {
      if(element) return true
      console.warn('element is undefined at emits.notifyVideoInfo -- animateEle')
      return false
    }
  },
  setup(props, {emit}) {
    const state = reactive({
      anim: null,
      delayTimeId: null,
      content: null,
      options: {},
      longPageStatus: false,
    })
    const eleWrapStyle = computed(() => {
      const {fitFullScreen, zorder, type, smallFontPath} = props.info
      const isLongPage = window.isLongPage
      const params = {
        type,
        "z-index": +zorder || 0,
        "pointer-events": "none"
      }
      if(fitFullScreen && !isLongPage) {

        const h = window.innerHeight
        const w = window.innerWidth
        const scale = 1.09344 // h / w > 610 / 375 ? h / 610 : w / 375
        let transform = `translate3d(-50%, -50%, 0) scale3d(${scale}, ${scale}, 1)`
        if(type === 'text' && smallFontPath) {
          transform = `translate(-50%, -50%) scale(${scale}, ${scale})`
        }
        params.width = '375px'
        params.height = '610px'
        params.transform = transform
        params['-webkit-transform'] = transform
      }
      return params
    })

    const eleStyle = computed(() => {
      const {width, height, x = 0, y = 0, isDown, zorder, videoPath, isScale, fitFullScreen, rotate} = props.info
      const isLongPage = window.isLongPage
      if(videoPath) {
         notifyVideoInfo()
        return {}
      }
      const animateStyle = getAnimateStyle()
      const style = {
        width: `${width / 2}px`,
        height: `${height/ 2}px`,
        left: `${x / 2}px`,
        zIndex: +zorder || 0,
        ...animateStyle
      }

      // 判断rem还是px
      const xUnitType = isDown ? 'bottom' : 'top'
      const s = 1220 - height - y
      // TODO: 计算当前屏幕底部总高度 1220 源码调试v.e, 什么情况下rem 什么情况下是px
      if(fitFullScreen) { // px
        const innerHeight = window.innerHeight / 610
        style[xUnitType] = `${isDown ? s / 2 * innerHeight : y / 2 * innerHeight}px`
      }else { // rem
        style[xUnitType] = `${pxToRem(isDown ? s : y )}rem`
      }

      if(rotate) {
        style.transform = `rotate(${rotate}deg)`
      }

      if(fitFullScreen && !isLongPage) {
        style[xUnitType] = `${isDown ? s / 2 : y / 2 }px`
        return  {
          ...style,
          width: `${width / 2}px`,
          height: `${height / 2}px`,
          left: `${x / 2}px`,
        }
      }
      return  style
    })
    const imgStyle = computed(() => {
      const { mask = {} } = props.info
      return mask && mask.img && {
        "-webkit-mask-image": `url(${mask.img})`,
        "-webkit-mask-size": "100% 100%",
        "mask-image": `url(${mask.img})`,
        "mask-size": "100% 100%"
      }
    })
    const paging = () => {
      (props.info || {}).isCheckTurn && props.toNextPage()
    }
    const getMinDelay = (millisecondStr) => {
      if(+millisecondStr.substring(0, millisecondStr.indexOf('ms')) <= 1000 ){
        return '2000ms'
      }
      return millisecondStr
    }
    const getAnimateStyle = () => {
      const { endAnimate, infinite, animate, id} = props.info
      const animationList = []

      let l = ''
      if(infinite) {
        let linear = 'linear'
        if(["animate_leftTop", "animate_leftBottom", "animate_rightTop", "animate_rightBottom"].indexOf(infinite.type) !== -1) {
          linear = 'ease-in-out'
        }
        let delayTime = getMinDelay(addMs(infinite.delayTime || '0'))
        if(props.pageStatus ==='activePage') {
          delayTime = getMinDelay(addMs(+infinite.delayTime + props.elementDelay || '0'))
        }
        l = `${infinite.type} ${addMs(infinite.durationTime)} ${linear} ${delayTime} forwards infinite`
      }

      if(animate) {
        animate.forEach((v, i) => {
          if(v) {
            let durationTime = addMs(+v.durationTime || '1000ms' )
            let delayTime = addMs(v.delayTime || '0')
            if(props.pageStatus === 'activePage') {
              delayTime = addMs(+v.delayTime + props.elementDelay || '0')
            }
            let c = l ? ',' + l : ''
            if(i === 0){
              animationList.push(`${v.type} ${durationTime} ease-in-out ${delayTime} 1 both ${c}`)
            }else {
              animationList.push(`${v.type} ${durationTime} ease-in-out ${delayTime} 1 forwards ${c}`)
            }
          }
        })
      }else {
        animationList.push(l)
      }

      return {
        animation: animationList.join(),
        '-webkit-animation': animationList.join(),
      }
    }
    const notifyVideoInfo = () => {
      emit('notifyVideoInfo', {
        index: selfPage,
        info: info,
      })
    }
    return {
      ...toRefs(state),
      eleWrapStyle,
      eleStyle,
      imgStyle,
      paging,
    }
  }
})
</script>
<style lang="scss" scoped>
.animate-ele-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  transform-origin: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  &.text-wrap {
    transform: translate(-50%, -50%);
    overflow: hidden;
    .animate-ele{
      overflow: hidden;
    }
  }

  .animate-ele-no-event {
    position: absolute;
    pointer-events: auto;
    img {
      width: 100%;
    }
  }

  .animate-ele {
    position: absolute;
    pointer-events: auto;
    img{
      width: 100%;
    }
  }
}

</style>