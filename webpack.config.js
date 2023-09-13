const path = require("path");
const webpack = require("webpack");
const WebpackObfuscator = require("webpack-obfuscator");
const obfuscatorOptions = require("./obfuscator");

module.exports = ({ filename, filetype, funcname, compress }) => {
  const commonConfig = {
    mode: "production",
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    entry: "./src/index.js",
    module: {
      rules: [
        // NOTE: used because webpack.DefinePlugin globals obfuscation issues
        {
          test: /\.js$/,
          loader: "string-replace-loader",
          options: {
            multiple: [
              { search: "dont_remove_filename_var", replace: filename },
              { search: "dont_remove_content_type_var", replace: filetype },
              { search: "dontRemoveFunctionName", replace: funcname },
            ],
          },
        },
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
        COMPRESS: JSON.stringify(compress),
      }),
    ],
  };

  return [
    {
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "payload.umd.js",
        libraryTarget: "umd",
      },
      ...commonConfig,
    },
    {
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "payload.esm.js",
        libraryTarget: "module",
      },
      experiments: {
        outputModule: true,
      },
      ...commonConfig,
    },
  ];
};
