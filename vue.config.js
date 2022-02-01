module.exports = {
  // publicPath: '/',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/felix_frontend/'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // For dev deployment
  // publicPath: "dev",
  lintOnSave: false,
  devServer: {
    // before: require('./mock/mock-server.js'),
    proxy: {
      // '/': {
      //   target: 'http://samblana.vos.systems:8000'
      // },
      '/': {
        target: 'https://saveaword.com/api'
      }
    }
  }
}
