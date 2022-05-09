module.exports = {
  // publicPath: '/',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/felix_frontend'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // For dev deployment
  // publicPath: "dev",
  lintOnSave: false,
  devServer: {
    // before: require('./mock/mock-server.js'),
    proxy: {
      '/': {
        // target: 'https://staging.vsystems.dev',
        // target: 'http://163.172.101.111:8000',
        target: 'https://saveaword.com',
        // target: 'http://samblana.vos.systems:8000'
      }
    }
  }
}
