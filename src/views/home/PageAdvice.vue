<template>
  <div class="page-advice">
    <div class="bg-img"></div>
    <div class="wrap">
      <div class="content">
        <div class="title">
          <span class="left-name">{{ cardInfo.groomName }}</span>
          <span>&amp;</span>
          <span class="right-name">{{ cardInfo.brideName }}</span>
        </div>
        <img src="https://qnm.hunliji.com/o_1dl1gvum4icnabo1v1t83r196ta.png" class="invite">
        <div class="photo-wrap">
          <div class="photo-bg"
               :style="{
                  backgroundImage: `url(${share.icon})`
               }">
          </div>
          <div class="photo">
            <img :src="share.icon">
          </div>
        </div>
        <div data-v-7a2756ab="" class="btn button-wrap s">我也要制作</div>
        <span class="link">礼金提现与投诉建议</span>
      </div>
      <!---->
    </div>
    <img src="https://qnm.hunliji.com/o_1dl1gvum4gmn1lt3hlq11coe94b.png" class="cover-pic">
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    cardInfo: {
      type: Object,
      default: () => ({})
    },
    share: {
      type: Object,
      default: () => ({})
    }
  },
})
</script>
<style lang="scss" scoped>
.page-advice {
  height: 100%;

  .bg-img {
    height: 100%;
    width: 100%;
    top: 0;
    position: absolute;
    z-index: -1;
    background: url(https://qnm.hunliji.com/o_1dje9n06lsavleaosf107b9g61h.png?imageView2/1/w/750/h/1209) no-repeat;
    background-size: cover;
    pointer-events: none;
  }

  .wrap {
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 632px;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    top: 46%;
    position: absolute;
    height: 1020px;
    border: 2px solid #fff;
    padding: 5px;

    .content {
      display: flex;
      align-items: center;
      height: 100%;
      flex-direction: column;
      background: #fff;
      opacity: 1;
      font-family: PingFang SC;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 1.28rem .29333rem .10667rem;
        font-size: .58667rem;
        overflow: hidden;
        flex-wrap: nowrap;
        .left-name, .right-name {
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          width: 3.04rem;
        }
        .left-name {
          text-align: right;
        }
      }

      .invite {
        width: 5.06667rem;
        height: .85333rem;
      }

      .photo-wrap {
        margin: .90667rem 0 1.06667rem;
        width: 4.8rem;
        height: 4.8rem;
        position: relative;
        border-radius: .26667rem;
        overflow: hidden;

        .photo-bg {
          height: 100%;
          position: relative;
          background-size: cover;
          background-repeat: no-repeat;
          filter: blur(10px);
          &:after {
            position: absolute;
            content: " ";
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: hsla(0,0%,100%,.7);
          }
        }

        .photo {
          position: absolute;
          width: 3.04rem;
          height: 100%;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }

  .cover-pic {
    width: 100%;
    position: absolute;
    bottom: 0;
    pointer-events: none;
  }
}
</style>