module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // For dev deployment
  // publicPath: "dev",
  lintOnSave: false,
  devServer: {
    // before: require('./mock/mock-server.js'),
    proxy: {
      '/': {
        target: 'http://192.168.1.142:8000'
      }
    }
  }
}
