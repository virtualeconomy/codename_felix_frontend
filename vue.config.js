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
      'save': {
        target: 'https://saveaword.com/api/'
      },
      '/': {
        target: 'http://samblana.vos.systems:8000'
      }
    }
  }
}
