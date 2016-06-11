// var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
module.exports = {
  entry: {
    'app':'index.js',
    'vendors': [
       'lodash'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      },
      { test: /\.txt$/, loader: "raw-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.(woff(2)?|eot|svg|ttf)$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  resolve: {
    root: [__dirname],
    extensions: ['', '.js']
  },
  plugins: [],
  devtool:"eval"
}
