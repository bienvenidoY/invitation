<template>
  <div class="wish-wrap" :class="{'wish-show': isShow}">
    <!-- 礼物 -->
    <Gift />
    <!-- 弹幕 -->
    <Barrage />
    <!-- 留言祝福 -->
    <Greeting />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Gift from './components/Gift/Gift.vue'
import Barrage from './components/Barrage/Barrage.vue'
import Greeting from './components/Greeting/Greeting.vue'


export default defineComponent({
  name: 'Wish',
  components: {
    Gift,
    Greeting,
    Barrage,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    }
  }
})
</script>