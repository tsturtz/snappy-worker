const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const dotenv = require("dotenv");

module.exports = (_env, argv) => {
  return {
    target: "node",
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "index.js",
    },
    resolve: {
      extensions: [".ts", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [new EnvironmentPlugin(Object.keys(dotenv.config().parsed || {}))],
  };
};
