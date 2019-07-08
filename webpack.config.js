const path = require('path')

const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { removeEmpty } = require('webpack-config-utils')

const htmlConfig = require('./src/config/htmlConfig')

const { NODE_ENV } = process.env

const deploymentLevelSpecificConfig = {
  entry: {
    production: {
      'public/index': path.join(__dirname, 'src', 'index.js'),
    },
    development: {
      'public/index': [
        'webpack-hot-middleware/client',
        path.join(__dirname, 'src', 'index.js')
      ]
    }
  },
  devtool: {
    production: undefined,
    // 'cheap-module-eval-source-map' is the fastest type of source map that still
    // almost perfectly preserves the original source files and line numbers.
    development: 'cheap-module-eval-source-map'
  },
  module: {
    rules: {
      production: [
        // We use ExtractTextPlugin only in production because it breaks HMR.
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader']
          })
        }
      ],
      development: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  },
  plugins: {
    production: [
      new ExtractTextPlugin({
        filename: '[name].bundle.css'
      })
    ],
    development: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}

module.exports = removeEmpty({
  mode: NODE_ENV,
  name: 'client',
  target: 'web',
  entry: deploymentLevelSpecificConfig.entry[NODE_ENV],
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: deploymentLevelSpecificConfig.devtool[NODE_ENV],
  module: {
    rules: [
      {
        test: /\.js(?:x?)$/, // match .js files and .jsx files
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      }
    ].concat(deploymentLevelSpecificConfig.module.rules[NODE_ENV])
  },
  resolve: {
    // Make the webpack resolver look for .jsx files (in addition to defaults),
    // so you can import a .jsx file without specifying the extension
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      config: path.resolve(__dirname, 'src/config'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      sagas: path.resolve(__dirname, 'src/sagas'),
      services: path.resolve(__dirname, 'src/services'),
      state: path.resolve(__dirname, 'src/state'),
      styles: path.resolve(__dirname, 'src/styles')
    }
  },
  plugins: removeEmpty([
    new webpack.DefinePlugin({
      'HTML_CONFIG': JSON.stringify(htmlConfig)
    }),
    new CleanWebpackPlugin(
      [
        'dist/*'
      ],
      {
        root: __dirname,
        exclude: '.gitkeep'
      }
    ),
    new CopyWebpackPlugin([
      // The 'to:' paths are relative to the 'output.path:' directory
      { from: 'src/server.js', to: 'server.js' },
      { from: 'src/config/serverConfig.js', to: 'config/serverConfig.js' },
      { from: 'src/config/bundleConfig.js', to: 'config/bundleConfig.js' },
      { from: 'src/config/winston.js', to: 'config/winston.js' },
      { from: 'src/assets', to: 'public/assets', ignore: '.DS_Store' },
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.template.ejs',
      chunks: ['public/index'],
      filename: 'public/index.html',
      favicon: "src/assets/amida-fav.png"
    }),
  ].concat(deploymentLevelSpecificConfig.plugins[NODE_ENV]))
})
