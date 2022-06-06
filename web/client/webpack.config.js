const path = require("path");
const webpack = require("webpack");

module.exports = function webpackConfig() {
  return {
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    ],
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public'),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        views: path.join(__dirname, './src/views'),
        components: path.join(__dirname, './src/components'),
        assets: path.join(__dirname, './src/assets'),
        hooks: path.join(__dirname, './src/hooks'),
        helpers: path.join(__dirname, './src/helpers'),
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    devServer: {
      hot: true,
      open: true,
      port: 9000,
      static: { directory: path.join(__dirname, 'public') },
      proxy: {
        '/api': {
          target: 'http://ui:9000',
          router: () => 'http://api:8000',
        },
      },
    },
  };
};
