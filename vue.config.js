module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://m.weibo.cn/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
