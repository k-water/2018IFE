const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:4].js',
    path: path.resolve('dist')
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
          }
        ]
      }, {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            outputPath: 'images/' // 图片打包后存放的目录
          }
        }]
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/, // 只转化src目录下的js
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost', // 默认是localhost
    port: 3000, // 端口
    open: true, // 自动打开浏览器
    hot: true // 开启热更新
  },
  resolve: {
    extensions: [
      '.js',
      '.css',
      '.json'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true
    }),
    new ExtractTextWebpackPlugin('css/style.css'),
    new CleanWebpackPlugin('dist'),
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development'
}