export type BuildMode = "production" | "development";
export type BuildPath = {
  entry: string;
  build: string;
  html: string;
};

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPath;
  port: number;
  isDev: boolean;
  apiUrl: string;
  mediaUrl: string;
  receivingIncomingMessage: number;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
}
