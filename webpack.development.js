/* eslint-disable */
var optionalRequire = require('optional-require')(require);
var webpack = require('webpack');
var config = optionalRequire('./config');
var DashboardPlugin = require('webpack-dashboard/plugin');

if (!config) {
  console.log('Could not find the config.js file. Copy config.example.js, ' +
    'rename it to config.js, and change values as necessary.');
  process.exit(1);
}

console.log('Kinetic Request CE is running at',
  config.kineticWebserver);

module.exports = {
  entry: [
    'babel-polyfill',
    'isomorphic-fetch',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:'+config.localPort,
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new DashboardPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: config.localPort,
    hot: true,
    overlay: true,
    proxy: {
      '/': {
        target: config.kineticWebserver,
        headers: { 'X-Webpack-Bundle-Name' : config.bundleName },
        secure: false,
        autoRewrite: true,
        protocolRewrite: 'http'
      }
    }
  },
};
