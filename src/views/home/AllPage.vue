<template>
<!-- longPage mode -->
<!-- swiper mode -->
  <div class="touch-container"
       v-touch:tap="tap"
       v-touch:swipeup="toNextPageVertical"
       v-touch:swipedown="toPrevPageVertical"
  >
    <div class="wrapper" v-if="cardData.page">
      <div v-for="(item, index) in page"
           :key="item.id"
           :style="getAnimationExtraStyle(index)"
           :class="getClass(index)">
        <div class="content" v-if="isDisplay(index)">
          <PageNormal
              v-bind="getPageProps(activePage, item)"
              :pageStatus="getPageStatus(index)"
              :inactiveShow="inactiveShow"
              :toNextPage="toNextPage"
          />
        </div>

      </div>
      <template v-if="isGuestPage">
        <div class="content" v-show="activePage === page.length">
          <PageGuest
              v-bind="getPageProps(activePage, page[activePage])"
          />
        </div>
      </template>
      <template>
        <div class="content" v-show="activePage === page.length + 1">
          <PageAdvice :cardInfo="cardInfo" :share="share" />
        </div>
      </template>

    </div>

  </div>
  <div :class="auxiliaryClass" :style="auxiliaryStyle"></div>
</template>
<script lang="ts">
import {computed, defineComponent, reactive, toRefs} from 'vue'
import PageAdvice from './PageAdvice.vue'
import PageNormal from "/@/views/home/PageNormal.vue"
import PageGuest from '/@/views/home/PageGuest.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import lodashGet from 'lodash.get'

export default defineComponent({
  name: 'AllPage',
  components: {
    PageAdvice,
    PageNormal,
    PageGuest,
    Swiper,
    SwiperSlide,
  },
  props: {
    page: {
      type: Array,
      default: () => [],
    },
    cardData: {
      type: Object,
      default: () => ({}),
    },
    cardInfo: {
      type: Object,
      default: () => ({}),
    },
    activePage: {
      type: Number,
      default: 1,
    },
    playMusic: {
      type: Function,
      default: () => ({})
    },
    waitForLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:activePage'],
  setup(props, { emit }) {
    const state = reactive({
      isGuestPage: false,
      share: {},
      theme: '',
      pageList: [],
      autoTurnTimeId: null,
      auxiliaryClass: 'auxiliary',
      auxiliaryStyle: {},
      leavePageIndex: -1,
      leavePageAnimation: {},
      enterPageIndex: -1,
      enterPageAnimation: {},
      inactiveShowTimeId: null,
      inactiveShow: false,
    })
    // 过滤数据中的特殊内容页，宾客回复页
    const normalPage = computed(() => {
      return [] //page
    })

    const getPageProps = (selfPage, element) => {
      const {cardData, theme} = toRefs(state)
      const {layout, id, loadingDelay} = element

      return {
        selfPage: selfPage,
        cardData,
        activePage: props.activePage,
        theme,
        pageId: id,
        layout: layout || {},
        elements: (layout || {}).elements || [],
        loadingDelay: loadingDelay
      }

    }

    const isStopSwipePage = () => {
      if(props.page.length > props.activePage && props.page[props.activePage].isCheckTurn) {
        return true
      }
      return false
    }

    const controlInactivePage = (time: number)  => {
      state.inactiveShow = true
      state.inactiveShowTimeId && clearTimeout(state.inactiveShowTimeId)
      if(time) {
        state.inactiveShowTimeId = setTimeout(() => {
          state.inactiveShow = false
        }, time)
      }
    }
    const toNextPage = () => {
      if(props.activePage > props.page.length - 2) return
      const newActivePage = props.activePage + 1
      emit('update:activePage', newActivePage)
      const {turnType, turnSecond = 0 } = lodashGet(props.page[newActivePage], 'preTurn', {})
      controlInactivePage(+turnSecond)
      state.leavePageIndex = props.activePage
      state.enterPageIndex = newActivePage
      // 动画设置
      state.auxiliaryClass = "auxiliary"
      state.auxiliaryStyle = {
          "animation-duration": "0ms"
      }
      state.leavePageAnimation = {
        name: `page-${turnType}-down-leave`,
        time: `${turnSecond}ms`,
      }
      state.enterPageAnimation = {
        name: `page-${turnType}-down-enter`,
        time: `${turnSecond}ms`,
      }
      // [延迟器使用：组件传值有时效，props.activePage不准确]
     let u = setTimeout(() => {
        state.auxiliaryClass = `auxiliary page-${turnType}-down`
        state.auxiliaryStyle = {
         "animation-duration": `${turnSecond}ms`,
       }
       // 设置自动翻页
       autoTurn()
       clearTimeout(u)
     }, 0)
    }

    const autoTurn = () => {
      // 如果有就清除
      state.autoTurnTimeId && clearTimeout(state.autoTurnTimeId)

      // 自动翻页时间
      let turnAutoSecond = lodashGet(props.page[props.activePage], 'nextTurn.turnAutoSecond', 0)
      // 加载资源延迟时间
      const loadingDelay = lodashGet(props.page[props.activePage], 'loadingDelay', 0)
      // 如果有自动翻页时间
      if(+turnAutoSecond) {
        // 加载资源延迟时间需要累加
        if(props.waitForLoading) {
          turnAutoSecond = props.waitForLoading ? +turnAutoSecond + loadingDelay: turnAutoSecond
        }
        // 启动定时器
        state.autoTurnTimeId = setTimeout(() => {
          toNextPage()
          state.waitForLoading = false
        }, turnAutoSecond)
      }
    }
    const toPrevPage = () => {
      const newActivePage = props.activePage - 1
      const { activePage } = props
      if(newActivePage < 0) return

      emit('update:activePage', newActivePage)
      state.leavePageIndex = props.activePage
      state.enterPageIndex = newActivePage
      // 动画设置
      state.auxiliaryClass = 'auxiliary'
      state.auxiliaryStyle = {
        'animation-duration': '0ms'
      }
      const {turnType, turnSecond = 0 } = lodashGet(props.page[activePage], 'preTurn', {})
      controlInactivePage(+turnSecond)
     // [延迟器使用：组件传值有时效，props.activePage不准确]
      let u = setTimeout(() => {
        state.auxiliaryClass = `auxiliary page-${turnType}-up`
        state.auxiliaryStyle = {
          'animation-duration': `${turnSecond}ms`
        }
        state.leavePageAnimation = {
          name: `page-${turnType}-up-leave`,
          time: `${turnSecond}ms`
        }
        state.enterPageAnimation = {
          name: `page-${turnType}-up-enter`,
          time: `${turnSecond}ms`
        }
        // 设置自动翻页
        autoTurn()
        clearTimeout(u)
      }, 0)


    }
    const isDisplay = (index: number) => {
      const currentIndex = props.activePage
      const nextIndex = props.activePage < props.page.length - 1 ?  props.activePage + 1 :  props.activePage
      const prevIndex = props.activePage ? props.activePage - 1 : 0
      return prevIndex === index || nextIndex === index || currentIndex === index
    }
    const getClass = (index: number) => {
      if(!isDisplay(index)) return null
      let cls = ''
      if(props.activePage === index) {
        cls += 'page-active'
      }else {
        cls += 'page-inactive'

        if(!state.inactiveShow) {
          cls += ' hidden'
        }
      }
      if(state.leavePageIndex === index && state.leavePageAnimation?.name) {
        cls += ` ${state.leavePageAnimation.name}`
      }else if(state.enterPageIndex === index && state.enterPageAnimation?.name){
        cls += ` ${state.enterPageAnimation.name}`
      }

      return cls
    }

    const getPageStatus = (index: number) => {
      return index === state.leavePageIndex ? "leaving" : index === props.activePage ? "activePage" : null
    }

    const getAnimationExtraStyle = (index: number) => {
      let sty = {}
      if(index === state.leavePageIndex && state.leavePageAnimation) {
        sty['animation-duration'] = state.leavePageAnimation.time
      }else if(index === state.enterPageIndex && state.enterPageAnimation) {
        sty['animation-duration'] = state.enterPageAnimation.time
      }
      return sty
    }

    const tap = () => {
      console.log('tap event')
      props.playMusic()
    }
    const toPrevPageVertical = () => {
      console.log('toPrevPageVertical')
      props.playMusic()
      toPrevPage()
    }
    const toNextPageVertical = () => {
      console.log('toNextPageVertical')
      props.playMusic()
      isStopSwipePage() || toNextPage()
    }
    return {
      ...toRefs(state),
      normalPage,
      getPageProps,
      tap,
      toPrevPageVertical,
      toNextPageVertical,
      toNextPage,
      getClass,
      isDisplay,
      getAnimationExtraStyle,
      getPageStatus,
    }
  }
})
</script>
<style lang="scss" scoped>
.touch-container {
  height: 100%;
}

.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateZ(26.66667rem);

  .content {
    backface-visibility: hidden;
    z-index: 10;
    width: 100%;
    height: 100%;
  }
}

.page-inactive {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 100%;
  left: 100%;
  z-index: 0;
  &.hidden {
    display: none;
  }
}
.page-active {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>