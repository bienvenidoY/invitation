<template>
  <div class="feedback-btn">
    <div class="button-wrap m">宾客回复</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AttendFeedback',
  props:{
    boxColor:{
      type: String,
      default: '',
    },
    fillColor:{
      type: String,
      default: '',
    },
    textColor:{
      type: String,
      default: '',
    },
  }
})
</script>
<style lang="scss" scoped>
.feedback-btn {
  position: absolute;
  bottom: 60px;
  left: 50%;
  z-index: 100;
  transform: translate3d(-50%,0,0);
  animation: fadeIn 1.8s ease-in-out .5s 1 both;
  .button-wrap {
    background: #f83244;
    text-align: center;
    color: #fff;
    font-size: 30px;
    font-weight: 400;
    box-shadow: 0.02667rem 0.02667rem 0.08rem rgb(0 0 0 / 35%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .l, .m {
    height: 80px;
    border-radius: 40px;
  }
  .m {
    width: 520px;
  }
}
</style>