import lodashGet from 'lodash.get'

/**
 * 添加毫秒单位字符串
 * @param time 毫秒时间
 */
export function addMs(time: number): string {
    if(time.toString().indexOf('ms') === -1) {
        return `${time}ms`
    }
    return time.toString()
}

/**
 * px转rem 750基线
 * @param num px单位 数字类型
 */
export function pxToRem(num: number): number {
    const rootValue = 75
    return num / rootValue
}

/**
 * 合并属性项
 * @param elements 节点
 */
interface merVal{
    merged: object | null;
    noMerge: []
}
export function mer(elements: []): merVal {
    let merged = null, noMerge: [] = []
    const textTypeList = ["bride", "groom", "location", "time", "lunar"]
    elements.forEach(ele => {
        const {type, textType} = ele
        if (type && type !== 'animate') {
            if (type === 'map' || type === 'text' && textTypeList.includes(textType)) {
                merged = ele
            } else {
                noMerge.push(ele)
            }
        }
    })
    return {
        merged,
        noMerge
    }
}

export function isGiftPage(sourcePage: object) {
   return lodashGet(sourcePage, 'layout.layTemplate') === 'layTemplate_gift'
}
export function isFeedbackPage(sourcePage: object) {
    return lodashGet(sourcePage, 'layout.layTemplate') === 'layTemplate_feedback'
}
