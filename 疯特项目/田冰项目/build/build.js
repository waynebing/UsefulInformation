require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var fse = require('fs-extra')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

fse.removeSync(path.join(config.build.assetsRoot, config.build.assetsSubDirectory))

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    // 普通webpackConfig编译的结果会存放在stats对象中，而数组形式的则会装进stats.stats数组中。所以这里都改成数组形式
    stats = stats.stats || [stats]
    stats.forEach(stat => {
        process.stdout.write(stat.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stat.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }
    })

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ))
})
