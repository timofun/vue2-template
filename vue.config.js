const path = require('path')
// const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
function resolve (dir) {
  return path.join(__dirname, dir)
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader').options({
      patterns: [
        path.resolve(__dirname, './src/common/css/variable.styl'),
        path.resolve(__dirname, './src/common/css/mixin.styl')
      ]
    })
}

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.resolve.symlinks(true)
    config.output.filename('[name].[hash].js').end()
    config.entry.app = ['babel-polyfill', resolve('src/main.js')]
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('views', resolve('src/views'))
      .set('utils', resolve('src/utils'))
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
  configureWebpack: (config) => {
    if (isProduction) {
      // 生产环境去掉console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // 压缩打包
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProduction,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // stylus: {
      //   import: '~common/css/variable.styl'
      // }
    }
    // 启用 CSS modules for all css / pre-processor files.
    // css-loader升级v3后使用css.requireModuleExtension代替css.modules
    // modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 5000,
    https: false,
    hot: true,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000/api/admin', // 设置你调用的接口域名和端口号，别忘了加http
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': ''
        }
      }
    }, // 设置代理
    before: app => {
    }
  },
  pluginOptions: {
  }
}
