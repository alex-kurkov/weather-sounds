const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const base = require('./base.config');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 9009,
    hot: true,
    open: true,
  },
  plugins: [new ESLintPlugin({
    fix: true,
  })],
});
