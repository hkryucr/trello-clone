const path = require('path')
const loader = {
  loader: 'sass-resources-loader',
  options: {
    resources: path.resolve(__dirname, './src/assets/_custom.scss')
  }
}

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
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            loader,
            'sass-loader'
          ]
        }
      ]
    }
  }
}
