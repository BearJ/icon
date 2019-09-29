declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'weui.js' {
  export function toast(text: string, options?: object): Promise<void>;
  export function actionSheet(
    menus: Array<object>,
    actions: Array<object>,
    options?: object,
  ): {
    hide(): void;
  };
}

declare module '@/../styles/weui-icon.js' {
  const content: { [name: string]: { [name: string]: string } };
  export default content;
}

declare function svg2css(map: Record<string, string>): string;
