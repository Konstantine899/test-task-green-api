import webpack from "webpack";
<<<<<<< HEAD

export function buildLoaders(): webpack.RuleSetRule[] {
=======
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      { loader: "css-loader", options: { modules: true } },
      "sass-loader",
    ],
  };
>>>>>>> develop
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };
<<<<<<< HEAD
  return [typescriptLoader];
=======
  return [typescriptLoader, cssLoaders];
>>>>>>> develop
}
