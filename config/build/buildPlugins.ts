import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildPlugins(options: BuildOptions): webpack.ProgressPlugin[] {
  const { paths, apiUrl, mediaUrl, receivingIncomingMessage } = options;
  return [
    new webpack.ProgressPlugin(),
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(apiUrl),
      __MEDIA_URL__: JSON.stringify(mediaUrl),
      RECEIVING_INCOMING_MESSAGE__: JSON.stringify(receivingIncomingMessage),
    }),
  ];
}
