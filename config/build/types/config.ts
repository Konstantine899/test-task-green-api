export type BuildMode = "production" | "development";
export type BuildPath = {
  entry: string;
  build: string;
  html: string;
};

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPath;
<<<<<<< HEAD
=======
  port: number;
  isDev: boolean;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
>>>>>>> develop
}
