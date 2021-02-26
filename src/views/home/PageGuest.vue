<template>
  <div class="page-guest" :style="pageStyle">
    <div class="page-bg" :style="bgStyle">
      <template v-for="item in elements" :key="elements.id">
        <AnimateEle
            :cardData="cardData"
            :info="item"
            :pageStatus="pageStatus"
            :pageId="pageId"
            :selfPage="selfPage"
            :toNextPage="toNextPage"
            :fontList="fontList"
        />
      </template>
    </div>
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
    <!-- 宾客反馈组件 -->
    <AttendFeedback />
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, reactive, toRefs} from 'vue'
import AnimateEle from '/@/components/AnimateEle/index.vue'
import NoMergeEditEle from '/@/components/NoMergeEditEle/index.vue'
import MergeEditEle from '/@/components/MergeEditEle/index.vue'
import {mer, pxToRem} from '/@/utils/tool'

export default defineComponent({
  name: 'PageGuest',
  components: {
    AnimateEle,
    NoMergeEditEle,
    MergeEditEle,
  },
  props: {
    selfPage: Number,
    cardData: Object,
    theme: Object,
    toPage: Function,
    elements: Array,
    pageId: [String, Number],
    pageStatus: String,
    toNextPage: Function,
    fontList: Array,
    isLongPage: Boolean,
    layout: Object
  },
  setup(props) {
    const state = reactive({
      isEdit: false,
      feedbackVisible: false,
      successVisible: false,
      isPreview: false
    })
    const pageStyle = computed(() => {
      if(window.isLongPage) {
        const height = props.layout.height ? props.layout.height : 1600
        return `${pxToRem(height)}`
      }
      return ''
    })
    const bgStyle = computed(() => {
      return {
        backgroundImage: `url${props.layout.background}`
      }
    })

    const editElements = computed(() => {
      return mer(props.elements)
    })

    return {
      ...toRefs(state),
      pageStyle,
      bgStyle,
      editElements,
    }
  }
})
</script>