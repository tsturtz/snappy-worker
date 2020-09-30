const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const dotenv = require("dotenv");
dotenv.config();

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
    plugins: [
      new EnvironmentPlugin([
        "PORT",
        "CONFIRMATION",
        "ACCESS_TOKEN",
        "VK_API_ENDPOINT",
        "VK_API_VERSION",
      ]),
    ],
  };
};
