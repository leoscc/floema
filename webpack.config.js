const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirApp = path.join(__dirname, 'app')
const dirStyles = path.join(__dirname, 'styles')
const dirNode = 'node_modules'

console.log(dirApp, dirStyles)

module.exports = {
  entry: [
    path.join(dirApp, 'index.js'),
    path.join(dirStyles, 'index.scss'),
  ],

  resolve: {
    modules: [
      dirApp,       
      dirStyles,
      dirNode
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./shared", to: "" },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
      },

      // styles
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: 'sass-loader'
          }
        ],
      },

      // images and fonts
      {
        test: /\.(jpe?g|png|gif|svg|avf|woff2?|fnt|webp)$/,
        loader: 'file-loader',
        options: {
          name (file) {
            return '[name].[hash].[ext]'
          }
        }
      }
    ]
  },
}