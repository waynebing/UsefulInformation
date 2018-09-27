// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const glob = require('glob')
// 编译指定入口：-e 入口名 或 --entry 入口名
const argv = require('yargs').alias('e', 'entry').argv

module.exports = {
    build: {
        env: require('./prod.env'),
        entryInfoList: listEntryInfos(),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false, // 禁止生成map文件
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 3920,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    },
    deploy: {
        // 部署到fe.onluxy.com/projectDirName/entryName.html
        fe: {
            deployPath: path.join(__dirname, '../../fe.onluxy.com'),
            projectDirName: require('./prod.env').PROJECT_NAME.toLowerCase(),
            host: 'https://fe.hellobyebye.com',
        }
    }
}

/**
 * 列举所有入口文件信息。若指定了entry参数，则只返回指定的入口文件信息
 * @return {[{indexPath:string, entryName:string}]}
 */
function listEntryInfos() {
    const entries = glob.sync(path.resolve(__dirname, '../src/entries/**/index.ejs'))
        .map(e => path.resolve(__dirname, e))
        .map(item => ({
            indexPath: item,
            entryName: path.basename(path.dirname(item))
        }))
    // 命令行控制只编译一个入口。参数--entry或-e
    if (argv.entry) {
        const targetEntry = entries.filter(item => item.entryName === argv.entry)
        if (targetEntry.length) {
            return targetEntry
        } else {
            console.error('Cannot found entry:', argv.entry)
        }
    }
    return entries
}
