var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const getEntryConfig = (entryInfo) => {
    const webpackConfig = {
        entry: {
            [entryInfo.entryName]: [
                // add hot-reload related code to entry chunks
                './build/dev-client?name=' + entryInfo.entryName,
                path.join(path.dirname(entryInfo.indexPath), 'index.js'), // 获得入口js文件
            ]
        },
        module: {
            rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
        },
        // cheap-module-eval-source-map is faster for development
        devtool: '#cheap-module-eval-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': config.dev.env
            }),
            // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            // https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin(utils.getHtmlPluginParam(entryInfo.indexPath)),
            new FriendlyErrorsPlugin()
        ]
    }

    return merge(baseWebpackConfig, webpackConfig)
}

module.exports = config.build.entryInfoList.map(getEntryConfig)
