export interface cardDataProps{
  coverPath: string,
  cardInfo: cardInfoProps,
  music: musicProps,
  page: Array<any | pageProps>,
  share: shareProps,
  envelope: envelopeProps,
}

interface envelopeProps {
  text: string,// 送呈语
  background: string,// 背景图
}

export interface cardInfoProps {
  brideName: string,
  groomName: string,
  cardType: number,
  id: number,
  latitude: number,
  longtitude: number,
  mapImage: string,
  setup: {
    /* 是否显示弹幕组件 */
    isShowBarrage: boolean
    /* 是否显示礼物组件 */
    isShowGift: boolean,
    /* 是否显示祝福组件 */
    isShowWish: boolean,
  }
}

export interface musicProps {
  audio: string,
  closeImg: string,
  img: string,
}

export interface shareProps {
  desc: string,
  icon: string,
  shareText: string,
  title: string,
  url: string,
}

export interface pageProps {
  id: number,
  pageType: number,
  coverPath: string,
  isCheckTurn: boolean,
  preTurn: turnProps,
  nextTurn: turnProps,
  layout: layoutProps
}

interface turnProps {
  turnAutoSecond: string | number,
  turnSecond: string | number,
  turnType: string | number,
}

export interface layoutProps {
  background: string,
  isCheckTurn: boolean,
  elements: Array<any | elementsProps>,
  filter?: number,
  dominantHue?: String,
  attendButton?: {
    boxColor: string,
    fillColor: string,
    textColor: string,
  }
}

interface animateProps {
  delayTime?: string,
  durationTime: string,
  type: string,
}

export interface elementsProps {
  id: string,
  type?: string,
  isCheckTurn?: boolean,
  isDown?: boolean,
  isScale?: boolean,
  zorder: number,
  img?: string,
  x: string,
  y: string,
  editBtnPosition?: number
  width: string,
  height: string,
  fitFullScreen: boolean,
  animate?: animateProps,
  infinite?: animateProps,
  content?: string,
  /* 可以编辑元素的标识 */
  path?: string,
}