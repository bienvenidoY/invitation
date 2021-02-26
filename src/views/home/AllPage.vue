<template>
<!-- longPage mode -->
<!-- swiper mode -->
  <div class="touch-container">
    <div class="wrapper">
      <swiper
          style="height: 100%"
          :space-between="0"
          :activeIndex="activePage"
          direction="vertical"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :freeMode="false"
      >
        <swiper-slide v-for="item in page">
          <div class="content">
            <PageNormal
                v-bind="getPageProps(activePage, item)"
            />
          </div>

        </swiper-slide>
        <swiper-slide v-if="isGuestPage">
          <div class="content">
            <PageGuest
                v-bind="getPageProps(activePage, page[activePage])"
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <PageAdvice :cardInfo="cardInfo" :share="share" />
        </swiper-slide>
      </swiper>

    </div>

  </div>
</template>
<script lang="ts">
import {computed, defineComponent, reactive, toRefs} from 'vue'
import PageAdvice from './PageAdvice.vue'
import PageNormal from "/@/views/home/PageNormal.vue"
import PageGuest from '/@/views/home/PageGuest.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

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
    activePage: {
      type: Number,
      default: 1,
    },
    state: Object,
  },
  emits: ['update:activePage'],
  setup(props, { emit }) {
    console.log(props.page)
    const state = reactive({
      isGuestPage: false,
      share: {},
      theme: '',
      pageList: [],
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

    const onSwiper = () => {}
    const onSlideChange = (swiper) => {
      emit('update:activePage', swiper.activeIndex)
    }
    return {
      ...toRefs(state),
      normalPage,
      getPageProps,
      onSwiper,
      onSlideChange,
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
</style>