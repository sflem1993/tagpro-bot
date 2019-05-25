module.exports = {
  entry: './injectBot.js',
  output: {
    path: require('path').join(__dirname, './dist'),
    filename: 'bundledBot.js'
  }
};