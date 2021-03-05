<template>
  <div class="bg-imgs">
    <div v-for="(item, index) in bgImage"
         :style="getBgStyle(index, item.id)"
         class="bg-wrap">
      <div class="page-bg"
           :style="{ backgroundImage: `url(${item.src})` }"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'BgImage',
  props: {
    page: {
      type: Array,
      default: () => []
    },
    activePage: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
      const getBgStyle = (index, item) => {
        return 'themeBackground' === item ? {
          opacity: 1
        }: {
          opacity: index <= props.activePage ? 1 : 0
        }
      }

      const bgImage = computed(() => {
        const image = props.page.map((v) => {
          const layout = v.layout
          return {
            id: v.id,
            src: (layout || {}).background,
            layout: layout
          }
        })
        return image
      })

      return {
        getBgStyle,
        bgImage,
      }
  }
})
</script>
<style lang="scss">
.bg-imgs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  animation: fadeIn 1s ease-in-out .1s both 1;
  .bg-wrap {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    transition: all 1s;
    .page-bg {
      width: 100%;
      height: 100%;
      background-position: center 0;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}
</style>