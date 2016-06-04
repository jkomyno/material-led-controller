// @TODO: figure out why it doesn't work

const path = require('path');
const webpack = require('webpack');
const buildPath = path.resolve(__dirname, 'build');
// loader to strip arbitary functions out of the production code
const webpackStripLoader = require('strip-loader');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  devtool: 'cheap-module-source-map',
  // input config
  entry: path.join(__dirname, '/dev/app.js'),
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js' // Name of output file
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        /* I have to use JSON.stringify because
         * it's supposed to be a string embedded
         * in a string.
         * I could also have used "\"production\"",
         * but it's simply awful
         */
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false,
          properties: true,
          sequences: true,
          dead_code: true,
          conditionals: true,
          comparisons: true,
          evaluate: true,
          booleans: true,
          unused: true,
          loops: true,
          hoist_funs: true,
          cascade: true,
          if_return: true,
          join_vars: true,
          drop_console: true,
          drop_debugger: true,
          unsafe: true,
          hoist_vars: true,
          negate_iife: true,
          //side_effects: true
      },
      //sourceMap: true,
      mangle: {
          toplevel: true,
          sort: true,
          eval: true,
          properties: true
      },
      output: {
          space_colon: false,
          comments: function(node, comment) {
              var text = comment.value;
              var type = comment.type;
              if (type == "comment2") {
                  // multiline comment
                  return /@copyright/i.test(text);
              }
          }
      }
    }),
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        // removes every console.log from production
        loaders: ['babel', webpackStripLoader.loader("console.log")]
      },
      { // inline base64 URLs for <=8k images, direct URLs for the rest 
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' 
      }
    ]
  }
};

module.exports = config;