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
}

declare module '@/../styles/weui-icon.js' {
  const content: { [name: string]: string };
  export default content;
}
