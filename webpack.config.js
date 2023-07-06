const path = require("path");
const webpack = require("webpack");
const WebpackObfuscator = require("webpack-obfuscator");
const obfuscatorOptions = require("./obfuscator");

module.exports = ({ name, type, compress }) => ({
  mode: "production",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "window",
  },
  module: {
    rules: [
      {
        test: /assets\/.*/,
        use: "binary-loader",
      },
      {
        test: /.*/,
        enforce: "post",
        use: {
          loader: WebpackObfuscator.loader,
          options: obfuscatorOptions,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      FILENAME: JSON.stringify(name),
      CONTENTTYPE: JSON.stringify(type),
      COMPRESS: JSON.stringify(compress),
    }),
  ],
});
