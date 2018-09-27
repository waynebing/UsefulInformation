require('./check-versions')()

const argv = require('yargs')
    .option('site', {
        alias: 's',
        describe: 'Deploy site name. Keys of the "deploy" object which exported from "config/index.js".',
        string: true,
        demandOption: true,
    })
    .option('dev', {
        alias: 'd',
        describe: 'Deploy development version for show vue-tools',
        boolean: true,
    })
    .argv;

process.env.NODE_ENV = argv.dev ? 'development' : 'production' // npm scripts中的--dev参数

const site = argv.site // npm scripts中的--site参数

var ora = require('ora')
var fse = require('fs-extra')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var shell = require('shelljs')
var opn = require('opn')
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
    deploy()
})

function deploy() {
    if (config.build.entryInfoList.length !== 1) {
        // 一次只能部署一个入口文件，否则会覆盖其它开发同事的入口文件
        console.log(chalk.red('  Please Deploy with the parameter "-- -e [entry name]".\n'))
        process.exit(1)
    }
    if (!shell.which('git')) {
        console.log(chalk.red('  Sorry, deployment requires git'))
        process.exit(1)
    }

    spinner = ora('deploying...')
    spinner.start()

    const entryName = config.build.entryInfoList[0].entryName
    // 先更新代码，再把新html拷过去，以免冲突
    pull()
        .then(() => copyHtml(entryName))
        .then(() => push(entryName))
        .then(() => {
            spinner.stop()
            console.log(chalk.cyan('  Deploy complete.\n'))
            // 等待部署
            setTimeout(() => {
                opn(`${config.deploy[site].host}/${config.deploy[site].projectDirName}/${entryName}.html`)
            }, 1000)
        })
        .catch((e) => {
            console.log(chalk.red('  Deploy failed with errors.\n'))
            console.error(e)
            process.exit(1)
        })
}

function copyHtml(entryName) {
    const srcHtml = path.join(config.build.assetsRoot, entryName + '.html')
    const dstHtml = path.join(config.deploy[site].deployPath, config.deploy[site].projectDirName, entryName + '.html')
    console.log('copy', srcHtml, 'to', dstHtml)
    fse.copySync(srcHtml, dstHtml)
}

function pull() {
    shell.cd(config.deploy[site].deployPath)
    return promisifyExec('git pull')
}

function push(entryName) {
    shell.cd(path.join(config.deploy[site].deployPath, config.deploy[site].projectDirName))
    // git add 无法同步运行，所以干脆全部promise化
    return promisifyExec('git add -A')
        .then(() => promisifyExec(`git commit -am "Auto-deploy ${config.deploy[site].projectDirName}/${entryName}"`))
        .then(() => promisifyExec('git push'))
}

function promisifyExec(command) {
    return new Promise((resolve, reject) => {
        console.log(command)
        shell.exec(command, (code) => {
            if (code) {
                reject(new Error('Exit code:' + code))
            } else {
                resolve()
            }
        })
    })
}
