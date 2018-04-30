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
  //devtool: 'eval-source-map',
  module: {
    rules: [{
        test: /\.san$/,
        use: 'san-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/, // 只转化src目录下的js
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      }, {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
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
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名    
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
          chunks: 'initial',
          name: 'utils', // 任意命名
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
    }
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost', // 默认是localhost
    port: 3000, // 端口
    open: false, // 自动打开浏览器
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