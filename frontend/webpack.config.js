const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', { 
                targets: {
                  browsers: [
                    '>0.2%', 
                    'not dead', 
                    'not op_mini all', 
                    'firefox >= 78',
                    'chrome >= 90'
                  ]
                },
                useBuiltIns: 'usage',
                corejs: 3
              }],
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};