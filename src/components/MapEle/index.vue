<template>
  <div
      class="map"
       :style="mapStyle">
    <img  src="//qnm.hunliji.com/o_1blaaggv063m34kok21s8k1irnc.png" class="map-icon"> <span class="map-nav">导航</span></div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'MapEle',
  props: {
    cardData: {
      type: Object,
      default: {},
    },
    imgStyle: {
      type: Object,
      default: {},
    }
  },
  setup(props) {

    const mapImg = computed(() => {
      const { cardInfo = {} } = props.cardData
      const {mapImage, latitude, longtitude} = cardInfo

      return +latitude && + longtitude && mapImage ? mapImage : "//qnm.hunliji.com/o_1ccsiengt118kn771rtt1fdueco7.jpg"
    })
    const mapStyle = computed(() => {
      return Object.assign(props.imgStyle, {
        backgroundImage: `url(${mapImg.value})`,
      })
    })

    return {
      mapImg,
      mapStyle,
    }
  }
})
</script>
<style scoped lang="scss">

.map {
  position: relative;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  .map-icon {
    position: absolute;
    width: 50px;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
  }
  .map-nav {
    position: absolute;
    width: 100px;
    height: 56px;
    background: #7c7c7c;
    line-height: 56px;
    font-size: 28px;
    opacity: .6;
    border-bottom-left-radius: 5px;
    color: #fff;
    top: 0;
    right: 0;
    text-align: center;
  }
}
</style>