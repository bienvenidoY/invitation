<template>
  <div class="bottom-arrow" :style="{bottom: bottom}">
    <img data-v-1540976d="" src="//qnm.hunliji.com/o_1agpam0fsibn2814j110101jcr7.png">
  </div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    bottom: {
      type: String,
      default: '30px' ,
    }
  },
})
</script>
<style scoped lang="scss">
.bottom-arrow {
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
</style>