import path from "path";
import webpack from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildMode, BuildPath } from "./config/build/types/config";

export default (env: BuildEnv) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "dist"),
    html: path.resolve(__dirname, "public", "index.html"),
  };

  const mode: BuildMode = env.mode || "development";
  const port: number = env.port || 3000;
  const isDev: boolean = mode === "development";
  const apiUrl: string = "https://7105.api.greenapi.com";
  const mediaUrl: string = "https://7105.media.greenapi.com";
  const receivingIncomingMessage: number = 5000;

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    port,
    isDev,
    apiUrl,
    mediaUrl,
    receivingIncomingMessage,
  });

  return config;
};
