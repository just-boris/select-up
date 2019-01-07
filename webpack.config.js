const { CheckerPlugin: TsCheckerPlugin } = require("awesome-typescript-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    fps: "./src/common/fps-meter",
    "lit-element": "./src/lit-app",
    preact: "./src/preact-app"
  },
  output: {
    path: `${__dirname}/build`,
    chunkFilename: "chunk.[name].js"
  },
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules\/(?!@polymer)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { loose: true, useBuiltIns: "usage" }]
            ]
          }
        }
      },
      {
        test: /.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.css/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          { loader: "css-loader", options: { modules: true } }
        ]
      },
      {
        test: /\.svg/,
        loader: "raw-loader"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: "lit-element.html",
      template: "src/lit-element.html",
      chunks: ["fps", "lit-element"]
    }),
    new HtmlWebpackPlugin({
      filename: "preact.html",
      template: "src/preact.html",
      chunks: ["fps", "preact"]
    }),
    new TsCheckerPlugin()
  ],
  devServer: {
    port: 8000,
    contentBase: `./build`
  }
};
