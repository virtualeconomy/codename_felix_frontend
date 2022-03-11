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
        target: 'https://saveaword.com/api',
      }
    }
  }
}
