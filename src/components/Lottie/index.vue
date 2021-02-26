<template>
  <!-- lottie svg组件 -->
  <div ref="lavContainerRef" :style="style"></div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, watch, ref, onUnmounted} from 'vue'

export default defineComponent({
  name: 'Lottie',
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Object,
      required: true,
    },
    height: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
    play: {
      type: String,
      default: '',
    },
    renderer: {
      type: String,
      default: '',
    },
  },
  emits: {
    animCreated: (anim) => {
      if(anim) return true
      console.warn('anim is undefined at emits.animCreated')
      return false
    }
  },
  setup({width, height, renderer, options, play}, { emit }) {
    let anim: object = {
      play: () => {},
      pause: () => {},
      destroy: () => {},
    }
    const state = reactive({
      style: {
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
        overflow: "hidden",
        margin: "0 auto"
      },
    })
    watch(options, (optionsVal, oldOptionsVal) => {
      const {loop, animationData, path} = optionsVal
      if (!(loop === oldOptionsVal.loop &&
          animationData === oldOptionsVal.animationData &&
          path === oldOptionsVal.path) &&
          anim) {
        anim.destroy()
        init()
      }
    })
    watch(() => play, (playVal, oldPlayVal) => {
      if(playVal === 'lpPlay' && oldPlayVal === 'lpStop'){
         anim.play()
      }
      if(playVal === 'lpStop'){
         anim.pause()
      }
    })
    const lavContainerRef = ref(null)
    const init = () => {
      anim = s.a.loadAnimation({
        container: lavContainerRef.value,
        renderer: renderer,
        loop: !1 !== options.loop,
        autoplay: !1 !== options.autoplay,
        animationData: options.animationData,
        path: options.path
      })
      emit('animCreated', anim)
    }

    onUnmounted(() => {
      anim && anim.destroy()
    })
    return {
      ...toRefs(state),
      lavContainerRef,
    }
  }
})
</script>
<style lang="scss" scoped>
.animate-ele {
  position: absolute;
  pointer-events: auto;
  img{
    width: 100%;
  }
}
</style>