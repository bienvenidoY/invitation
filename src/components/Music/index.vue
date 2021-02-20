<template>
  <div class="music" @click="onChange" :class="isPlay ? 'music-open' : 'music-close'">
    <img :src="isPlay ? MUSIC_IMG.open : MUSIC_IMG.close" class="music-img">
    <audio :src="src" ref="audioRef" loop class="audio"></audio>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

const MUSIC_IMG: object = {
  close: '//qnm.hunliji.com/o_1bi67m2q63tilg81vh1q3v10g6c.png',
  open: '//qnm.hunliji.com/o_1bi67lq091qtt1gfs60cpadqjj7.png'
}

export default defineComponent({
  name: 'music',
  props: {
    src: {
      type: String,
      default: '',
    }
  },
  setup: (props) =>  {
    // 音乐播放停止控制
    const isPlay = ref<boolean>(false)
    const audioRef = ref<HTMLAudioElement | null>(null)

    const onChange = () => {
      isPlay.value = !isPlay.value
      if(isPlay.value) {
        // 播放
        audioRef.value?.play()
      }else {
        // 停止
        audioRef.value?.pause()
      }
    }

    onMounted(() => {
      if(props.src){
        audioRef.value?.play()
      }else {
        console.log('ok')
      }
    })
    return {
      MUSIC_IMG,
      isPlay,
      audioRef,
      onChange,
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
  &-open {
    animation: player 3s infinite linear;
  }
  &-close {

  }
  
  @keyframes player {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(1turn);
    }
  }
}
audio:not([controls]) {
  display: none!important;
}
</style>