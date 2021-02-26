<template>
  <div :data-ele="info.id" :style="fontStyle">
    {{content}}
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch } from 'vue'

export default defineComponent({
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    wrapStyle: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    }
  },
  setup({ info, isEdit, wrapStyle }) {
    const content = computed(() => {
      return info.content && info.content.replace(/\r\n|\n|\r/g, "<br>")
    })
    const fontStyle = computed(() => {
      const { height, width, color, alignment = 0, smallFontPath , fontSize} = info
      const textAlignMap = {
        0: 'left',
        1: 'center',
        2: 'right',
      }
      // 按需加载字体，如果没有smallFontPath方法会跳过
      loadFonts(smallFontPath)
      const textAlign = textAlignMap[alignment]

      return {
        ...wrapStyle,
        fontSize: `${fontSize}px`,
        color,
        textAlign: textAlign,
        fontFamily: getFontName(smallFontPath),
        width:`${width}px`,
        height: `${height}px`,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        transformOrigin: "left top",
        transform: `scale(0.5)`,
      }
    })
    watch(info, (infoVal, oldInfoVal) => {
      infoVal.smallFontPath === oldInfoVal.smallFontPath || isEdit || loadFonts()
    })
    // methods
    const getFontName = (url: string): string => {
      if(!url) return ''
      return url.split("/").pop().split(".")[0]
    }
    const loadFonts = (fontUrl: string): void => {
      if(!fontUrl) return
      if('fonts' in document) {
        const fontName = getFontName(fontUrl)
        const font = new FontFace(fontName, `url('${fontUrl}') format('woff2')`)
        font && font.load().then((res) => {
          document.fonts.add(res)
        })
      }
    }

    return {
      content,
      fontStyle,
    }
  },
})
</script>