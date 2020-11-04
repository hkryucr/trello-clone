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
  rules: [
    // ... other rules omitted
    // this will apply to both plain `.scss` files
    // AND `<style lang="scss">` blocks in `.vue` files
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  ]
}
