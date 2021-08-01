const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './client/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist')
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader', 'sass-loader'
        ],
        test: /\.s?css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ]
}