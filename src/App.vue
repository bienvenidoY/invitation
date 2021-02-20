<template>
  <div id="wrapper" :class="wrapperCls">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { vaildatePc } from '/@/utils/utils'

export default defineComponent({
  setup() {
    const state = reactive({
      wrapperCls: vaildatePc() ? 'pc-wrapper' : 'wrapper'
    })
    return {
      ...toRefs(state)
    }
  }
})

</script>

<style lang="scss">
#wrapper {
  height: 100%;
  position: relative;
  -webkit-transform: scale(1);
  transform: scale(1);
  max-width: 10rem;
  margin: 0 auto;
  .pc-wrapper {
    overflow: hidden;
  }
}
.container {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>