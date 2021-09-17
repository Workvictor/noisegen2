const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const devtool = 'inline-source-map';

module.exports = {
  target: ['web'],
  mode: 'development',
  devtool,
  entry: {
    index: {
      import: './src/index',
      filename: '[name].js',
    },
  },
  output: {
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'data/font/[hash][ext]',
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'data/img/[hash][ext]',
        },
      },
      {
        test: /\.(wav|mp3|ogg|flac)$/,
        type: 'asset/resource',
        generator: {
          filename: 'data/sfx/[hash][ext]',
        },
      },
      {
        test: /\.(html|json)$/,
        type: 'asset/resource',
        generator: {
          filename: 'data/text/[hash][ext]',
        },
        exclude: [path.resolve(__dirname, 'src/index.html')],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.css', '.json'],
    alias: {
      src: path.resolve(__dirname, './src/'),
    },
  },
  stats: {
    modules: false,
    reasons: false,
    moduleTrace: false,
    entrypoints: false,
  },
};
