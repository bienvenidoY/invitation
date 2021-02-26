<template>
  <div class="music"
       @click="changeStatus"
       :style="isHidden"
       :class="[music.cls, longPageClass]"
       >
    <img :src="music.img" class="music-img">
    <audio :src="music.audio" ref="audioRef" loop class="audio"></audio>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, reactive, computed, watch, nextTick, toRefs, onMounted} from 'vue'
import lodashGet from 'lodash.get'

const MUSIC_IMG: object = {
  close: '//qnm.hunliji.com/o_1bi67m2q63tilg81vh1q3v10g6c.png',
  open: '//qnm.hunliji.com/o_1bi67lq091qtt1gfs60cpadqjj7.png'
}

export default defineComponent({
  name: 'music',
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    },
    activePage: Number,
  },
  emits: ['musicStatePause'],
  setup: (props, { emit }) =>  {
    const state = reactive({
      isOpen: false,
      hasPlayed: false,
      loop: true,
      musicChanged: null
    })
    const audioRef = ref<HTMLAudioElement | null>(null)

    const longPageClass = computed(() => {
      return window.isLongPage ? 'fixed' : ''
    })
    const music = computed(() => {
      const {music = {}} = props.cardData
      return {
        img: state.isOpen ? (music.img || MUSIC_IMG.open) : MUSIC_IMG.close,
        audio: music.audio,
        cls: state.isOpen ? 'music-open' : 'music-close'
      }
    })

    // 宾客页 地图页 礼品页不显示 音乐按钮
    const isHidden = computed(() => {

      const { page = [] } = props.cardData
      const isGift = lodashGet(page[props.activePage], 'layout.layTemplate') === 'layTemplate_gift'
      const isFeedback = lodashGet(page[props.activePage], 'layout.layTemplate') === 'layTemplate_feedback'
      if(isGift || isFeedback || props.activePage > page.length - 1) {
        return {
          opacity: 0,
          zIndex: -10
        }
      }
      return  ''
    })
    const changeStatus = () => {
      state.hasPlayed = true
      if(audioRef.value.paused) {
        state.isOpen = true
        audioRef.value.play()
      }else {
        state.isOpen = false
        audioRef.value.pause()
      }
      emit('musicStatePause', state.isOpen ? 'false' : 'true')
    }
    const play = () => {
      state.isOpen = true
      audioRef.value.play()
      state.hasPlayed = true
    }
    const setOpenStatus = () => {
      state.isOpen = true
      emit('musicStatePause', 'false')
    }
    const autoPlay = () => {
      if(audioRef.value) setOpenStatus()
    }
    const changeMusic = (source) => {
      if(source.path) {
        audioRef.src = source.path
        state.musicChanged = source.path
        state.loop = source.isCirculateMusic
        if(state.isOpen) {
          setOpenStatus()
          state.hasPlayed = true
        }else {
          state.hasPlayed = false
        }
      }else {
        state.musicChanged = source.path
        audioRef.pause()
      }
    }
    const injectGlobal = () => {
      // changeMusic()
    }

    onMounted(() => {
      nextTick(() => {
        // injectGlobal()
        // autoPlay()
      })
    })

    return {
      ...toRefs(state),
      longPageClass,
      music,
      isHidden,
      audioRef,
      changeStatus,
      play,
    }
  },
})

</script>
<style lang="scss">
.music {
  position: absolute;
  width: 84px;
  height: 84px;
  top: 20px;
  right: 20px;
  z-index: 100;

  .audio {
    opacity: 0;
  }

  .music-img {
    width: 100%;
    vertical-align: middle;
  }
}
.music-open {
  animation: player 3s infinite linear;
}
.music-close {

}
@keyframes player {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1turn);
  }
}
audio:not([controls]) {
  display: none!important;
}
</style>