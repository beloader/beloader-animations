const merge = require('webpack-merge');
const base = require('./base.js');
const path = require('path');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('./dev'),
    filename: 'beloader-animations.js',
    chunkFilename: 'animations/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true,
            produceSourceMap: true
          }
        },
        enforce: 'post',
        exclude: /node_modules|\.spec\.js$/
      }
    ]
  }
});
