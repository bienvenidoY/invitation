<template>
  <div v-if="info.type !== 'guestReply'" class="ele-wrap" :style="eleWrapStyle">
    <div class="edit-ele" :style="editIconStyle">
      <div class="edit-wrap" :style="positionStyle" @click="edit">
        <span class="circle edit-in"></span>
        <span class="circle edit-out"></span>
        <div v-if="editTipShow" class="edit-tip">
          上传图片
        </div>
        <img v-else src="editIcon" class="edit-img">
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'NoMergeEditEle',
  props: {
    info : Object,
    selfPage : Number,
    cardData : Object
  },
  setup({info, selfPage, cardData}) {
    const eleWrapStyle = computed(() => {
      const {fitFullScreen, zorder, type} = info
      const isLongPage = window.isLongPage
      const params = {
        zorder, type,
        "z-index": 999,
        "pointer-events": "none"
      }

      if(fitFullScreen && !isLongPage) {
        const h = window.innerHeight
        const w = window.innerWidth
        const scale = h / w > 610 / 375 ? h / 610 : w / 375
        params.weight = '375px'
        params.height = '610px'
        params.transform = `translate3d(-50%, -50%, 0) scale3d(${scale}, ${scale}, 1})`
      }
      return params
    })

    const positionStyle = computed(() => {
      const left = '-27px'
      return {
        0: {
          top: "50%",
          marginLeft: left,
          marginTop: left
        },
        1: {
          top: 0,
          marginLeft: left,
          marginTop: "54px"
        },
        2: {
          bottom: 0,
          marginLeft: left,
          marginBottom: "54px"
        }
      }[info.editBtnPosition || 0]
    })

    const editIconStyle = computed(() => {

    })

    const editIcon = computed(() => {
      const {textType, type} = info
      const pencilIcon = '//qnm.hunliji.com/o_1blae19da7r21etql8r1h45nv2m.png'
      const imageIcon = "//qnm.hunliji.com/o_1blae09s8fcu12qrpgv1qgh1tijh.png"
      return textType ? pencilIcon : type === 'map' || type === 'text' ? pencilIcon : imageIcon
    })

    const editTipShow = computed(() => {
      const {textType, type} = info
      return selfPage === 0 && type === 'image' && !textType
    })

    const edit = () => {
      console.log('nomerge edit')

      const {id, type} = info
      const { page } = cardData
      console.log('onEditPageHole', id, type, page.id)
    }

    return {
      eleWrapStyle,
      positionStyle,
      editIconStyle,
      editIcon,
      editTipShow,
      edit,
    }
  }
})
</script>
<style lang="scss" scoped>

.ele-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate3d(-50%,-50%,0);
  transform-origin: center
}

.edit-ele {
  position: absolute;
  z-index: 999;
  pointer-events: none;
  .edit-wrap {
    animation: editIconAni 3s ease-in-out infinite;
    width: 54px;
    height: 54px;
    position: absolute;
    left: 50%;
    pointer-events: auto;
    .circle {
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate3d(-50%,-50%,0);
      transform: translate3d(-50%,-50%,0)
    }
    .edit-in {
      width: 50px;
      height: 50px;
      background: #f83244;
      opacity: .9;
      z-index: 2
    }

    .edit-out {
      width: 54px;
      height: 54px;
      background: #f83244;
      z-index: 1;
      opacity: .5
    }
    .edit-img {
      position: absolute;
      width: 22px;
      height: 22px;
      z-index: 2;
      top: 50%;
      left: 50%;
      -webkit-transform: translate3d(-50%,-50%,0);
      transform: translate3d(-50%,-50%,0)
    }
  }
}

@-webkit-keyframes editTipAni {
  0% {
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    opacity: 1
  }

  to {
    -webkit-transform: translateY(12px) scale(0);
    transform: translateY(12px) scale(0);
    opacity: 0
  }
}

@keyframes editTipAni {
  0% {
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    opacity: 1
  }

  to {
    -webkit-transform: translateY(12px) scale(0);
    transform: translateY(12px) scale(0);
    opacity: 0
  }
}

@-webkit-keyframes editIconAni {
  0% {
    -webkit-transform: scale(1)
  }

  50% {
    -webkit-transform: scale(.9)
  }

  to {
    -webkit-transform: scale(1)
  }
}

@keyframes editIconAni {
  0% {
    -webkit-transform: scale(1)
  }

  50% {
    -webkit-transform: scale(.9)
  }

  to {
    -webkit-transform: scale(1)
  }
}

</style>