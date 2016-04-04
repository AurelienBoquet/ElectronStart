var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpackPostcssTools = require("webpack-postcss-tools");
var globalMap = webpackPostcssTools.makeVarMap("app/css/global.css");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/main/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.css")
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader"
        ),
        include: path.join(__dirname, 'app')
      }
    ]
  },
  postcss: [
    require("autoprefixer"),
    require("postcss-custom-properties")({
      variables: globalMap.vars
    }),
    require("postcss-custom-media")({
      extensions: globalMap.media
    }),
    require("postcss-calc")
  ]

};
