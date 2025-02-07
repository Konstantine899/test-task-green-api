import { BuildOptions } from "./types/config";
import webpack from "webpack";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildPlugins } from "./buildPlugins";
<<<<<<< HEAD
=======
import { buildDevServer } from "./buildDevServer";
>>>>>>> develop

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
<<<<<<< HEAD
  const { mode, paths } = options;
=======
  const { mode, paths, isDev } = options;
>>>>>>> develop
  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
    },
    module: {
<<<<<<< HEAD
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),

=======
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(),
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
>>>>>>> develop
    plugins: buildPlugins(options),
  };
}
