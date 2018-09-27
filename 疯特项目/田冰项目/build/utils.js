var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

/**
 * 根据html路径获取入口名
 * @param {string} htmlPath
 * @return {string}
 */
exports.getEntryNameFromHtml = function(htmlPath) {
    return path.basename(path.dirname(htmlPath))
}

/**
 * 根据html路径获取htmlPlugin的配置参数
 * @param {string} htmlPath
 * @return {object}
 */
exports.getHtmlPluginParam = function(htmlPath) {
    const entryName = exports.getEntryNameFromHtml(htmlPath)
    const conf = {
        filename: `${entryName}.html`, // html文件输出路径
        template: htmlPath, // 模板路径
        chunks: ['manifest', entryName, 'vendor'], // 每个html页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
        inject: true, // js插入位置
        // hash:true // 生成的例子 vendors.js?f3aaf25de220e214f84e
        chunksSortMode: 'dependency',

        // ejs模板参数。如果在编译脚本中修改process.env.NODE_ENV，在ejs中读取不会生效，所以还是手动传个参数进去
        isDevelop: process.env.NODE_ENV === 'development',
    }
    if (process.env.NODE_ENV === 'production') {
        //  HTML压缩规则
        // https://github.com/kangax/html-minifier#options-quick-reference
        conf.minify = {
            removeComments: true, // 是否去掉注释
            collapseWhitespace: true, // 是否去掉空格
            collapseInlineTagWhitespace: true, // 去除内联标签中的空格
            collapseBooleanAttributes: true, // 简化布尔属性
            removeAttributeQuotes: true, // 是否移除属性引号
            removeEmptyAttributes: true, // 移除空属性
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
            minifyJS: true, // 是否压缩html里的css
            minifyCSS: true, // 是否压缩html里的js
        }
    }
    return conf
}
