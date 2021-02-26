<template>
  <div class="page-loading">
    <div :class="loadingClass">
      <div class="percent-content">
        <img class="loading-img" src="https://qnm.hunliji.com/o_1dsrefrp6dboc0blm19csp8g9.gif">
        <div class="progress-wrap">
          <div class="progress-color" :style="{width: `${percent}%`}"></div>
        </div>
        <div class="progress-text" :style="percentTextStyle">{{ percent }}%</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue'

export default defineComponent({
  name: 'PageLoadingMask',
  props: {
    isShowLoading: Boolean,
    loading: Boolean,
    percent: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    const percentTextStyle = computed(() => {
      return {
        marginLeft:`${props.percent}%`
      }
    })
    const loadingClass = computed(() => {
      const cls = props.loading ? " percent_wrap" : "hiddenLoading"
      if(props.isShowLoading) {
        return cls + ' loading-show'
      }
      return cls
    })
    return {
      loadingClass,
      percentTextStyle,

    }
  }
 })
</script>
<style lang="scss" scoped>
.page-loading .hiddenLoading {
  display: none
}

.page-loading .percent_wrap {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  opacity: 0;
  -webkit-transition: all 1.5s;
  transition: all 1.5s;
  pointer-events: none;
  z-index: 999999;
}

.page-loading .loading-show {
  opacity: 1;
  z-index: 100
}

.page-loading .percent-content {
  position: absolute;
  top: 50%;
  width: 180px;
  margin-top: -20px;
  left: 50%;
  text-align: center;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  z-index: 100
}

.page-loading .percent-content .loading-img {
  width: 2.93333rem;
  height: 2.18667rem;
  margin-left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%)
}

.page-loading .percent-content .progress-wrap {
  width: 100%;
  height: 5px;
  border-radius: 50px;
  margin-top: 14px;
  overflow: hidden;
  vertical-align: middle;
  background-color: #f5f5f5;
  border-radius: 2.66667rem
}

.page-loading .percent-content .progress-wrap .progress-color {
  position: relative;
  height: 100%;
  background-color: #ff8080;
  border-radius: 50px;
  -webkit-transition: all .5s cubic-bezier(.08,.82,.17,1) 0s;
  transition: all .5s cubic-bezier(.08,.82,.17,1) 0s
}

.page-loading .percent-content .progress-text {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  margin-top: 6px;
  color: #ff8080;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  width: 50px;
  text-align: right;
  -webkit-transition: all .5s cubic-bezier(.08,.82,.17,1) 0s;
  transition: all .5s cubic-bezier(.08,.82,.17,1) 0s
}
</style>