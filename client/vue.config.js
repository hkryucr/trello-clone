const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  css: {
    requireModuleExtension: false
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/assets/_custom.scss'), path.resolve(__dirname, './node_modules/bootstrap/scss/_funtions.scss'), path.resolve(__dirname, './node_modules/bootstrap/scss/_mixins.scss'), path.resolve(__dirname, './node_modules/bootstrap/scss/_modal.scss'), path.resolve(__dirname, './node_modules/bootstrap-vue/src/components/modal/index.scss')]
    }
  }
}
