
export function addZero(num: number) {
    return num < 10 ? `0${num}` : num
}

/**
 * 小数安全的运算
 * @param {*} num1
 * @param {*} num2
 * @param type
 */
export function safeCompute (num1:number, num2:number, type:string) {
    const num1Digits = (num1.toString().split('.')[1] || '').length
    const num2Digits = (num2.toString().split('.')[1] || '').length
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
    switch (type) {
        case '+':
            return (num1 * baseNum + num2 * baseNum) / baseNum
        case '-':
            return (num1 * baseNum - num2 * baseNum) / baseNum
        case '*':
            return (num1 * baseNum * (num2 * baseNum)) / baseNum
        case '/':
            return (num1 * baseNum) / (num2 * baseNum) / baseNum
    }
}
export function isIPhoneX () {
    const isIphone = /iphone/gi.test(window.navigator.userAgent)
    const pixelRatio = window.devicePixelRatio
    const { width, height } = window.screen
    const isIPhoneX =
        isIphone &&
        pixelRatio &&
        pixelRatio === 3 &&
        width === 375 &&
        height === 812
    const isIPhoneXSMax =
        isIphone &&
        pixelRatio &&
        pixelRatio === 3 &&
        width === 414 &&
        height === 896
    const isIPhoneXR =
        isIphone &&
        pixelRatio &&
        pixelRatio === 2 &&
        width === 414 &&
        height === 896
    // const paddingBottom = isIPhoneX || isIPhoneXSMax || isIPhoneXR
    // return paddingBottom ? '30px' : '0'
    return isIPhoneX || isIPhoneXSMax || isIPhoneXR
}
/**
 * 获取web环境
 */
export function getWebEnv() {
    const ua = navigator.userAgent
    let BrowserInfo = {
        isPhone: !!/(iPhone|iPad|iPod|iOS|Android)/i.test(ua),
        isWeixin: !!ua.match(/MicroMessenger/gi),
        isMiniProgram: !!ua.match(/miniProgram/gi),
        isAli: !!ua.match(/AlipayClient/gi),
        isAndroid: !!ua.match(/android/gi),
        isIphone: !!ua.match(/iphone|ipod/gi),
        isIpad: !!ua.match(/ipad|Macintosh/gi),
        isIOS: !!ua.match(/iphone|ipod|ipad|Macintosh/gi),
        isIPhoneX,
        isMobilMode: '',
    }
    return BrowserInfo
}

/**
 * 验证pad还是pc
 */
export function vaildatePc(){
    const userAgentInfo = navigator.userAgent
    const Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod',
    ]
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
        }
    }
    return flag
}
/**
 * ios键盘弹出，关闭后存在不可见蒙层bug
 * 输入框失去焦点时，调用此方法
 */
export function hackIosKeyboardClose() {
    const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    window.scrollTo(0, scrollTop + 1)
}

// 移除对象多个指定键
export function removeDataKeys(data: object, keys: []) {
    let result = data
    if (keys.length) {
        for (let i = 0; i < keys.length; i++) {
            result = removeDataKey(result, keys[i])
        }
        return result
    } else {
        return data
    }
}

// 移除对象一个指定键
function removeDataKey(data: object, key: string) {
    let result = {}
    for (let currentKey in data) {
        if (currentKey !== key) {
            // @ts-ignore
            result[currentKey] = data[currentKey]
        }
    }
    return result
}
