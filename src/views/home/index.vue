<template>
  <AllPage
      v-model:activePage="activePage"
      :playMusic="playMusic"
      :page="page"
      :cardInfo="cardInfo"
      :cardData="cardData"
      :loadingDelay="loadingDelay"
      :waitForLoading="waitForLoading"
  ></AllPage>

  <!-- 音频节点 -->
  <Music v-if="cardData.page"
         :cardData="cardData"
         ref="musicRef"
         :activePage="activePage"/>
  <!--  祝福弹幕  -->
  <Wish v-if="false"/>
  <BgImage
      :page="page"
      :activePage="activePage"
  />
  <!-- 底部操作提示 -->
  <BottomArrow
      v-if="cardData.page"
      :cardData="cardData"
      :activePage="activePage"
  />
  <!-- loading 加载显示 -->
  <PageLoadingMask
      :loading="loading"
      :isShowLoading="isShowPageLoading"
      :percent="percent"
  />
</template>
<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs, ref} from 'vue'
import Music from '/@/components/Music/index.vue'
import BottomArrow from '/@/components/BottomArrow/index.vue'
import Wish from '/@/components/Wish/index.vue'
import AllPage from './AllPage.vue'
import PageLoadingMask from '/@/components/PageLoadingMask/index.vue'
import BgImage from '/@/components/BgImage/index.vue'

import {getCardInfo as fetchGetCardInfo} from '/@/api/card'
import base64 from 'base-64'

export default defineComponent({
  components: {
    Music,
    BottomArrow,
    Wish,
    AllPage,
    PageLoadingMask,
    BgImage,
  },
  setup() {
     const state = reactive({
      cardData: {}, // 全量数据
      cardInfo: {}, // 卡片说明数据，包含新人信息、地图信息
      page: [], // 页面数据
      share: {}, // 微信分享需要的数据
      fontList: [], // 文字列表
      activePage: 0, // 当前激活页码
      requestLoading: true, // 请求接口loading
      isShowPageLoading: false, // 加载动画loading
      percent: 0, // 加载动画 百分比
      loadingDelay: 0, // 加载动画时长
      waitForLoading: false, //
      loading: false, //
      hasStartedMusic: false, // 音乐开始控制器：当页面第一次touchstart时播放音乐
    })
    let a = null
    const getCardInfo = () => {
      state.requestLoading = true
      state.loading = true
      fetchGetCardInfo('1231').then(res => {
        const data = res.data || {}
        const {cardInfo = {}, share = {}, page = [] } = data
        // initShar(share)
        // if(state.isShowLoading) {
        //   state.waitForLoading = true
        // }
        // if(page.length) {
        //   page[0].loadingDelay = 1500
        // }

        // page, fontList isEdit 加载资源然后重置pageLoading
        state.isShowPageLoading = true
       a = setInterval(() => {
          state.percent = state.percent + 10
          console.log(state.percent)
         if(state.percent === 100) {
           state.isShowPageLoading = false
           state.cardData = data
           state.cardInfo = cardInfo
           state.share = share
           state.page = page
           console.log(state.page)
           clearInterval(a)
           a = null
         }
        }, 100)
      })
        .finally(() => {
          state.requestLoading = false
        })
    }

    const getFontList = () => {
      state.fontList = []
    }

    const musicRef = ref(null)
    const playMusic = () => {
      if(musicRef.value && !state.hasStartedMusic) {
        musicRef.value.play()
        state.hasStartedMusic = true
      }
    }

    getCardInfo()
    getFontList()
    onMounted(() => {

    })
    return {
      ...toRefs(state),
      musicRef,
      playMusic,
    }
  }
})
</script>
<style scoped lang="scss">
</style>