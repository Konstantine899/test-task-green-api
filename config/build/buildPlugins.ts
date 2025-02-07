import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
<<<<<<< HEAD
=======
import MiniCssExtractPlugin from "mini-css-extract-plugin";
>>>>>>> develop

export function buildPlugins(options: BuildOptions): webpack.ProgressPlugin[] {
  const { paths } = options;
  return [
    new webpack.ProgressPlugin(),
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
<<<<<<< HEAD
=======
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
>>>>>>> develop
  ];
}
