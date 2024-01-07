const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'csvtabler.js',
    libraryTarget: 'var',
    library: 'csvtabler',
    clean: true
  }
}