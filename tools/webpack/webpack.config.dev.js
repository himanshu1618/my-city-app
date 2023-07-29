import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common from './webpack.config.common';

const appPath = path.resolve(__dirname, '../..');

export default merge(common, {
  watch: true,
  devtool: 'cheap-module-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  entry: [
    // must be first entry to properly set public path
    path.resolve(appPath, 'assets/js/webcomponent/webpackPublicPath'),
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(appPath, 'assets/js/webcomponent/index') // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(appPath, 'assets/templates/index.dev.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ]
});
