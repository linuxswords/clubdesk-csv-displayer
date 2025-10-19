const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'csvtabler.js',
    libraryTarget: 'umd',
    library: 'csvtabler',
    globalObject: 'this',
    clean: true
  },
  devtool: 'source-map'
}