/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.production.js',
  ],
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    })
  ]
};
