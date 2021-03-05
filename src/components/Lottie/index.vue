<template>
  <!-- lottie svg组件 -->
  <div ref="lavContainerRef" :style="style"></div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, watch, ref, onUnmounted, onMounted} from 'vue'

import lottieWeb from 'lottie-web'

export default defineComponent({
  name: 'Lottie',
  props: {
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
  setup(props, { emit }) {
    let anim = null
    const state = reactive({
      style: {
        width: props.width ? `${props.width}px` : "100%",
        height: props.height ? `${props.height}px` : "100%",
        overflow: "hidden",
        margin: "0 auto"
      },
    })
    watch(() => props.options, (optionsVal, oldOptionsVal) => {
      if (!(optionsVal.loop === oldOptionsVal.loop &&
          optionsVal.animationData === oldOptionsVal.animationData &&
          optionsVal.path === oldOptionsVal.path)) {
        anim && anim.destroy()
        init()
      }
    })
    watch(() => props.play, (playVal, oldPlayVal) => {
      if(playVal === 'lpPlay' && oldPlayVal === 'lpStop'){
         anim.play()
      }
      if(playVal === 'lpStop'){
         anim.pause()
      }
    })
    const lavContainerRef = ref(null)
    const init = () => {
      anim = lottieWeb.loadAnimation({
        container: lavContainerRef.value,
        renderer: props.renderer,
        loop: props.options.loop,
        autoplay: props.options.autoplay,
        animationData: props.options.animationData,
      })

      emit('animCreated', anim)
    }

    onMounted(() => {
      init()
    })

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