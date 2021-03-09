<template>
  <AllPage
      v-model:activePage="activePage"
      :playMusic="playMusic"
      :page="page"
      :cardInfo="cardInfo"
      :cardData="cardData"
      :waitForLoading="waitForLoading"
  ></AllPage>

  <!-- 音频节点 -->
  <Music v-if="cardData.page"
         :cardData="cardData"
         ref="musicRef"
         :activePage="activePage"/>
  <!--  祝福弹幕  -->
  <Wish v-bind="cardInfo.setup"  v-if="cardInfo.setup"/>
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
import { getFontList as fetchFontList } from '/@/api/card'
import useCardInfo from './useCardInfo.ts'

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
      isShowPageLoading: false, // 加载动画loading
      waitForLoading: false, //
      loading: false, // 是否需要显示加载动画
      hasStartedMusic: false, // 音乐开始控制器：当页面第一次touchstart时播放音乐
    })

    /* hooks: 请求卡片数据，同时计算加载资源等待时间和百分比 */
    const { fontList } = toRefs(state)
    const infoProps = {
      id: '123123',
      fontList,
    }
    const {
      cardInfo, share, page, cardData,
      percent, fetchCardInfo, loading, isShowPageLoading
    } = useCardInfo(infoProps)
    state.cardInfo = cardInfo
    state.share = share
    state.page = page
    state.cardData = cardData

    // 请求字体资源库
    const getFontList = () => {
      return fetchFontList().then(res => {
        state.fontList = res.data
      })
    }
    //
    const musicRef = ref(null)
    const playMusic = () => {
      if(musicRef.value && !state.hasStartedMusic) {
        musicRef.value.play()
        state.hasStartedMusic = true
      }
    }


    onMounted(async () => {
      await getFontList()
      await fetchCardInfo(true)
    })
    return {
      ...toRefs(state),
      loading,
      isShowPageLoading,
      percent,
      musicRef,
      playMusic,
    }
  }
})
</script>
<style scoped lang="scss">
</style>