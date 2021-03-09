import {getCardInfo} from '/@/api/card'
import {reactive, toRefs} from "vue"
import lodashGet from 'lodash.get'
import lodashTake from 'lodash.take'
import Base64 from 'base-64'
import axios from 'axios'
import {elementsProps, pageProps, shareProps} from '/@/types/page'

interface infoProps {
  cardId: string,
  fontList: any[],
}
export default function useCardInfo(props: infoProps) {
  const state = reactive({
    cardData: {},
    cardInfo: {},
    page: [],
    share: {},
    loading: true,
    isShowPageLoading: true,
    percent: 0,
  })
  /**
   * 获取请帖卡片信息
   * @param loading 是否需要loading显示
   * @param isInitShare 是否需要初始化微信分享
   */
  const fetchCardInfo = async (loading: boolean, isInitShare: boolean) => {
    // 请求接口 拿到请帖数据
    const data = await getCardInfo(props.cardId).then((res) => (res.data || {}))
    const {
      page = [],
      share = {},
      cardInfo = {},
    } = data
    page[0] && (page[0].loadingDelay = 1500)
    state.loading = loading
    state.cardData = data
    state.share = share
    state.page = page
    state.cardInfo = cardInfo
    // 初始化微信分享
    isInitShare && initShare(share)

    // 加载动画
    await loadingSource(page, false, props.fontList, (currentProcess: number, allProcess: number) => {
      const percent = parseInt(String(parseInt(String(currentProcess), 10) / parseInt(String(allProcess), 10) * 100));
      state.percent = percent
      if (percent === 100) {
        state.isShowPageLoading = false
      }
    })

  }
  return {
    ...toRefs(state),
    fetchCardInfo,
  }
}

/* 微信初始化 工具类函数 */
const initShare = (share: shareProps) => {
  console.log(share)
}

/**
 * 加载当前页资源，如果下一页为内容页，则一同加载，计算loading加载时长和百分比
 * @param page
 * @param isEdit
 * @param originFontList
 * @param callback
 */
async function loadingSource (page: Array<pageProps>, isEdit: Boolean, originFontList: Array< any |string>, callback: Function) {
  //imageList 需要加载的图片, fontList 需要加载的字体列表
  // @ts-ignore
  const imageList: string[] = [], fontList: [{path: string, needLoadFont: boolean, name: string}] = []
  console.log(originFontList)
  const [firstPage, secondPage] = lodashTake(page || [], 2)

  const loadPage = [] // 需要加载的页面
  if(firstPage && firstPage.pageType === 5) {
    loadPage.push(firstPage)
    secondPage && loadPage.push(secondPage)
  }else if(firstPage && firstPage.pageType !== 5) {
    loadPage.push(firstPage)
  }

  // 整合需要加载页面的所有 elements，同时聚合 background图到imageList
  let elements: any[] = []
  loadPage.forEach((v) => {
    elements = elements.concat(lodashGet(v, 'layout.elements', []))
    const background = lodashGet(v, 'layout.background', '')
    background && imageList.push(background)
  })

  // 聚合svg内的图片，如果是content资源则直接聚合imageList，否则为promise数组
  const p: any[] = [] // promise 数组
  elements.forEach((ele: elementsProps) => {
    const { type, img, path, content } = ele
    // 如果有图片将图片聚合到 imageList
    img && imageList.push(img)

    if(type === 'animate') {
      if (path) {
        // path是https链接，所以需要promise异步请求队列
        p.push(axios(path).then(res => {
          return res.data && JSON.parse(Base64.decode(res.data))
        }))
      } else {
        // base64解码资源并取出图片聚合至 imageList
        const o: any = (content && JSON.parse(Base64.decode(content)) || {}).assets
        (o || []).forEach((v: { u: any }) => {
          v.u && imageList.push(v.u)
        })
      }
    }
  })

  // 聚合 字体列表

  // https加载远端资源中的图片信息
  await Promise.all(p).then(res => {
    res.forEach(v => {
      const {assets = []} = v
      assets.forEach((t: { u?: string }) => {
        t.u && imageList.push(t.u)
      })
    })
  })

  // 需要加载资源总量
  const allLoadCount = imageList.length + fontList.length
  // 已加载资源量
  let currentCount = 0
  imageList.forEach(v => {
    const image: HTMLImageElement = new Image()
    image.src = v
    image.onload = function () {
      callback(currentCount += 1, allLoadCount)
    }
    image.onerror = function () {
      callback(currentCount += 1, allLoadCount)
    }
  })

  // isIosVersionBefore14 ios 14版本以前
  let _ = '', isIosVersionBefore14 = false
  fontList.forEach(v => {
    const { needLoadFont, path, name } = v
    if('fonts' in document && !isIosVersionBefore14 ) {
      const font = new FontFace(v.name, `url('${v.path}') format('woff2')`)
      font && font.load().then((res) => {
        document.fonts.add(res)
        v.needLoadFont && callback(currentCount += 1, allLoadCount)
      })
        .catch(() => {
          console.log('load font error,', v)
          v.needLoadFont && callback(currentCount += 1, allLoadCount)
        })
    }
    if (v.needLoadFont) {
      _ += `@font-face {font-family: ${name};src: url(${path})}`
    }else {
      callback(currentCount += 1, allLoadCount)
    }

    if(isIosVersionBefore14) {
      _ += `@font-face {font-family: ${name};src: url(${path})}`
      callback(currentCount += 1, allLoadCount)
    }

    if(!('fonts' in document && !isIosVersionBefore14)) {
      document.head.insertAdjacentHTML("beforeend", '<style type="text/css">' + _ + "</style>")
    }
    callback(currentCount += 1, allLoadCount)
  })
}