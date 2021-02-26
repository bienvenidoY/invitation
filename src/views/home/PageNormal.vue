<template>
  <div class="page-normal" :style="pageStyle">
    <div class="normal-bg"
         :style="{'backgroundImage': `url(${layout.background})`}"
    ></div>
    <template v-for="item in elements" :key="elements.id">
      <AnimateEle
        :cardData="cardData"
        :info="item"
        :pageStatus="pageStatus"
        :pageId="pageId"
        :selfPage="selfPage"
        :toNextPage="toNextPage"
        :elementDelay="elementDelay"
        :inactiveShow="inactiveShow"
        :fontList="fontList"
        @click="notifyVideoInfo(item)"
      />
    </template>
    <template v-if="isEdit">
      <!-- noMarge类型  -->
      <template v-for="info in editElements.noMerge"
                :key="`eidtElement_${info.id}`">
        <NoMergeEditEle :cardData="cardData"
                        :selfPage="selfPage"
                        :info="info"/>
      </template>

      <!-- merged类型 -->
      <MergeEditEle :info="editElements.merged"
                    :selfPage="selfPage"
      />
    </template>


  </div>
</template>
<script lang="ts">
import {defineComponent, computed, reactive, toRefs} from 'vue'
import AnimateEle from '/@/components/AnimateEle/index.vue'
import NoMergeEditEle from '/@/components/NoMergeEditEle/index.vue'
import MergeEditEle from '/@/components/MergeEditEle/index.vue'

import { mer } from '/@/utils/tool'

export default defineComponent({
  name: 'PageNormal',
  components: {
    NoMergeEditEle,
    MergeEditEle,
    AnimateEle,
  },
  props: {
    selfPage: Number,
    cardData: Object,
    elements: Array,
    layout: Object,
    pageId: [String, Number],
    pageStatus: String,
    toNextPage: Function,
    loadingDelay: Number,
    waitForLoading: Boolean,
    inactiveShow: Boolean,
    fontList: Array
  },
  emits: {
    notifyVideoInfo(element) {
      if(element) return true
      console.warn('element is undefined at emits.notifyVideoInfo')
      return false
    }
  },
  setup({selfPage, cardData, elements, pageId, waitForLoading, inactiveShow, loadingDelay} , { emit }) {
    const state = reactive({
      isEdit: false,
    })
    const pageStyle = computed(() => {})
    const editElements = computed(() => {
      return mer(elements)
    })
    const elementDelay = computed(() => {
      return waitForLoading && loadingDelay || 0
    })

    const notifyVideoInfo = (element) => {
      emit('notifyVideoInfo', element)
    }
    return {
      ...toRefs(state),
      pageStyle,
      editElements,
      elementDelay,
      notifyVideoInfo,

    }
  },
})
</script>
<style lang="scss" scoped>
.page-normal {
  height: 100%;
  width: 100%;

  .normal-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center 0;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0;
    z-index: 0;
    animation: fadeIn 1s ease-in-out .1s both 1
  }
}
</style>