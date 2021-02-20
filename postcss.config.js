const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')
// @ts-ignore
module.exports = ({ file }) => {
  let remUnit
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    remUnit = 37.5
  } else {
    remUnit = 75
  }
  return {
    plugins: [
      pxtorem({
        rootValue: remUnit,
        unitPrecision: 4, // 保留小数位
        propList: ['*'],
        // selectorBlackList: [''], //过滤的类名
        replace: true, // 默认直接替换属性
        mediaQuery: false,
        minPixelValue: 6 // 所有小于设置的样式都不被转换
      }),
      autoprefixer({
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8'
        ]
      })
    ]
  }
}
