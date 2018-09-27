var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

var conf = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction
            ? config.build.productionSourceMap
            : config.dev.cssSourceMap,
        extract: isProduction
    }),
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
// 这里不是用rem 像素单位
// if (isProduction) {
//     conf.postcss = [
//         require('postcss-px2rem')({
//             // 这里不能太大，否则div里面套高度小于字号的图片或源码中存在元素间空格时，会因为字号导致div被撑大。也不能小于12，否则浏览器可能不支持
//             'remUnit': 12,
//             'baseDpr': 2  // 设置基本设备像素比（默认值：2）
//         })
//     ]
// }
module.exports = conf
