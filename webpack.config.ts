import path from "path";
import webpack from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildPath } from "./config/build/types/config";

export default (env: BuildEnv) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "dist"),
    html: path.resolve(__dirname, "public", "index.html"),
  };

  const mode = env.mode || "development";
  const port = env.port || 3000;
  const isDev = mode === "development";
  const apiUrl = "https://7105.api.greenapi.com";
  const mediaUrl = "https://7105.media.greenapi.com";

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    port,
    isDev,
    apiUrl,
    mediaUrl,
  });

  return config;
};
