declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare const __API_URL__: string;
declare const __MEDIA_URL__: string;
declare const RECEIVING_INCOMING_MESSAGE__: number;
