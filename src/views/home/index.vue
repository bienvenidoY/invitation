<template>
  <div class="aa">asdf</div>
  <div class="touch-container">
    <swiper
        :slides-per-view="3"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper>
  </div>
  <Music />
  <Wish/>
  <BottomArrow />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import Music from '/@/components/Music/index.vue'
import BottomArrow from '/@/components/BottomArrow/index.vue'
import Wish from '/@/components/Wish/index.vue'

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    Music,
    BottomArrow,
    Wish,
  },
  setup() {
    const onSwiper = (swiper: any) => {
      console.log(swiper);
    }
    const onSlideChange = () => {
      console.log('slide change');
    }
    return {
      onSwiper,
      onSlideChange,
    }
  }
})
</script>
<style>
.aa {
  font-size: 18px;
}
</style>