// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

import common from './webpack.config.common';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

const appPath = path.resolve(__dirname, '../..');
const publicPath = '/';

export default merge(common, {
  devtool: 'source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/
  entry: path.resolve(appPath, 'assets/js/webcomponent/index'),
  mode: 'production',
  output: {
    publicPath: publicPath,
    filename: '[name].[contenthash].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        cache: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(appPath, 'assets/templates/index.prod.html'),
      favicon: 'assets/images/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Note that you can add custom options here if you need to handle other custom logic in index.html
      env: 'production',
      custom_key: ''
    }),

    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
      generate: (seed, files) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        return {
          files: manifestFiles
        };
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
});
