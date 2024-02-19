const path = require("path");
const webpack = require("webpack");
const WebpackObfuscator = require("webpack-obfuscator");
const obfuscatorOptions = require("./obfuscator");

module.exports = ({ filename, filetype, funcname, compress, antibot }) => {
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
        // NOTE: Defines string names,
        // used because webpack.DefinePlugin globals obfuscation issues.
        {
          test: /\.js$/,
          loader: "string-replace-loader",
          options: {
            multiple: [
              { search: "dont_change_filename_var", replace: filename },
              { search: "dont_change_content_type_var", replace: filetype },
              { search: "dontChangeFunctionName", replace: funcname },
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
      // NOTE: Defines boolean globals to change execution flow.
      new webpack.DefinePlugin({
        CONFIG_COMPRESS: JSON.stringify(compress),
        CONFIG_ANTIBOT: JSON.stringify(antibot),
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
