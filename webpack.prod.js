const TerserPlugin = require('terser-webpack-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const config = require('./webpack.config');

const mode = 'production';

config.module.rules[0].options = undefined;

module.exports = {
  ...config,
  mode,
  devtool: undefined,
  stats: {
    ...config.stats,
    modules: true,
  },
  module: {
    rules: config.module.rules,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2018,
          module: true,
          output: {
            ecma: 2018,
          },
          compress: {
            passes: 3,
            drop_console: true,
            hoist_funs: true,
            reduce_vars: false,
            reduce_funcs: false,
            ecma: 2018,
            module: true,
            computed_props: false,
          },
          mangle: {
            module: true,
            properties: {
              keep_quoted: true,
              reserved: ['connectedCallback', 'disconnectedCallback'],
            },
          },
        },
      }),
      // new CssMinimizerPlugin(),
    ],
  },
};
