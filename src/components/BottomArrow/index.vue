<template>
  <div :class="arrowClassName"
       :style="arrowsStyle" v-show="show">
    <span v-if="giftPage" class="special-arrows" :style="arrowsTheme"></span>
    <img v-else :src="pageIcon" >
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, watch, reactive, toRefs, onMounted} from 'vue'
import lodashGet from 'lodash.get'

import { pxToRem, isFeedbackPage} from '/@/utils/tool'

export default defineComponent({
  name: 'arrows',
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    },
    activePage: Number,
    theme: Object,
  },
  setup(props) {
    const state = reactive({
      contentArrowIndex: null,
      pageIcon: props.cardData.pageIcon || '//qnm.hunliji.com/o_1agpam0fsibn2814j110101jcr7.png'
    })

    const show = computed(()=> {
      const { page = [] } = props.cardData
      const isPage = page.length > props.activePage + 1 && hasAutoOrClickTurn(page[props.activePage])
      const isEdit = false
      if(!isPage) {
        if(isEdit) {
          return  props.activePage === state.contentArrowIndex
        }else if(page.cardMerchant) {
          return props.activePage === state.contentArrowIndex || giftPage || isFeedbackPage(page[props.activePage])
        } else  {
          return props.activePage === state.contentArrowIndex || giftPage
        }
      }
      return false
    })

    const arrowsTheme = computed(() => {
      return {
        borderColor: (props.theme || {}).backgroundColor
      }
    })

    const arrowsStyle = computed(() => {
      const { page = [] } = props.cardData
      const activePage = props.activePage
      return giftPage.value ? {
        bottom: `${pxToRem(20)}rem`
      }: {
        bottom: `${pxToRem(activePage === page.length -1 ? 228 : 48)}rem`
      }
    })
    const arrowClassName = computed(() => {
      const rightType = ["vertical-regular", "vertical-inertial", "vertical-continuous", "vertical-rolling", "special-translate", "special-flip"]
      const nextTurnType = lodashGet(props.cardData[props.activePage], `page[${props.activePage}].nextTurn.turnType`)
      return rightType.includes(nextTurnType) ? 'right-arrows': 'bottom-arrows'
    })

    const giftPage = computed(() => {
      const pageType = lodashGet(props.cardData, `page[${props.activePage}].pageType`)

      return pageType === 4
    })
    /**
     * 当前页是否有 需要手动触发或自动触发翻页的时长
     * @param page
     */
    const hasAutoOrClickTurn = (page) => {
      return page.isCheckTurn || lodashGet(page, 'nextTurn.turnAutoSecond')
    }
    /**
     * 获取引导箭头的索引
     * 页面数据中没有手动isCheckTurn，或者自动翻页时长，则：
     * contentArrowIndex为查到的index
     */
    const getContentArrowIndex = () => {
      const { page = [] } = props.cardData
      state.contentArrowIndex = page.findIndex(v => {
        return !(hasAutoOrClickTurn(v))
      }) || null
    }

    onMounted(() => {
      getContentArrowIndex()
    })
    return {
      ...toRefs(state),
      arrowClassName,
      arrowsTheme,
      arrowsStyle,
      giftPage,
      show,
    }
  }
})
</script>
<style scoped lang="scss">
.bottom-arrows {
  position: absolute;
  left: 50%;
  margin-left: -40px;
  width: 72px;
  text-align: center;
  z-index: 999;
  animation: bottomArrowing 1.6s infinite;
  pointer-events: none;
  img {
    width: 100%;
  }
  .special-arrows {
    display: inline-block;
    height: .32rem;
    width: .32rem;
    border-width: .05333rem .05333rem 0 0;
    border-color: #e36e80;
    border-style: solid;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg)
  }
}
@keyframes bottomArrowing {
  0% {
    transform: translateY(-30px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-20px);
    opacity: 1;
  }
  100% {
    transform: translateY(-30px);
    opacity: 0.8;
  }
}

.right-arrows {
  position: absolute;
  left: 100%;
  top: 50%;
  margin-left: -1.12rem;
  margin-top: -.53333rem;
  width: .96rem;
  text-align: center;
  z-index: 999;
  animation: rightArrowing 1.6s infinite;
  pointer-events: none;
  img {
    width: 100%;
  }
  .special-arrows {
    display: inline-block;
    height: .32rem;
    width: .32rem;
    border-width: .05333rem .05333rem 0 0;
    border-color: #e36e80;
    border-style: solid;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg)
  }
}

@-webkit-keyframes rightArrowing {
  0% {
    -webkit-transform: translateX(-.13333rem);
    opacity: .8
  }

  50% {
    -webkit-transform: translateX(.26667rem);
    opacity: 1
  }

  to {
    -webkit-transform: translateX(-.13333rem);
    opacity: .8
  }
}

@keyframes rightArrowing {
  0% {
    -webkit-transform: translateX(-.13333rem);
    opacity: .8
  }

  50% {
    -webkit-transform: translateX(.26667rem);
    opacity: 1
  }

  to {
    -webkit-transform: translateX(-.13333rem);
    opacity: .8
  }
}

</style>