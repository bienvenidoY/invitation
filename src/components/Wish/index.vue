<template>
  <div class="wish-wrap">
    <!-- 礼物 -->
    <Gift />
    <!-- 弹幕 -->
    <Barrage />
    <!-- 弹幕点击需要展示  -->
    <BarrageTip />
    <!-- 留言祝福 -->
    <Greeting />
  </div>
</template>
<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue'
import Gift from './components/Gift/Gift.vue'
import Barrage from './components/Barrage/Barrage.vue'
import BarrageTip from './components/Barrage/BarrageTip.vue'
import Greeting from './components/Greeting/Greeting.vue'
import { getGiftAndReplyList } from '/@/api/card'

export default defineComponent({
  name: 'Wish',
  components: {
    Gift,
    Greeting,
    Barrage,
    BarrageTip,
  },
  props: {
    /* 是否显示组件 */
    isShowCom: {
      type: Boolean,
      default: false,
    },
    /* 是否显示弹幕组件 */
    isShowBarrage: {
      type: Boolean,
      default: false,
    },
    /* 是否显示礼物组件 */
    isShowGift: {
      type: Boolean,
      default: false,
    },
    /* 是否显示祝福组件 */
    isShowWish: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = reactive({

    })

    const fetchGiftAndReply = () => {
      getGiftAndReplyList().then(res => {
        console.log(getGiftAndReplyList)
      })
    }

    onMounted(() => {
      fetchGiftAndReply()
    })
    return {
      ...toRefs(state),
    }
  }
})
</script>
<style lang="scss">
.wish-wrap {
  .hide {
    display: none
  }
  .wish-warp-show {
    animation: fadeIn 1s ease-in-out .1s 1 normal both running;
    opacity: 1;
    z-index: 100
  }
}

</style>