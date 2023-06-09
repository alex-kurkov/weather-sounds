const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const postCSSPresetEnvPlugin = require('postcss-preset-env');

const rootDirectory = path.resolve(__dirname, '..');

module.exports = {
  context: path.resolve(rootDirectory, 'src'),
  entry: '../src/index.ts',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(rootDirectory, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDirectory, 'public/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(rootDirectory, 'public/favicon.ico'),
          to: path.resolve(rootDirectory, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    enforceExtension: false,
    alias: {
      sounds: path.resolve(rootDirectory, 'src/assets/sounds'),
      images: path.resolve(rootDirectory, 'src/assets/images'),
      icons: path.resolve(rootDirectory, 'src/assets/icons'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(rootDirectory, 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(?:jpg|mp3|svg|)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postCSSPresetEnvPlugin,
                ],
              },
            },
          }, 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
