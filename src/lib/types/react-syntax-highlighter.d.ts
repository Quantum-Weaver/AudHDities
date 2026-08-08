// src/types/react-syntax-highlighter.d.ts

declare module 'react-syntax-highlighter' {
  import { ComponentType, ReactNode } from 'react';

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: string | string[];
    className?: string;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    lineProps?: any;
    customStyle?: any;
    codeTagProps?: any;
    useInlineStyles?: boolean;
    PreTag?: string | ComponentType<any>;
    CodeTag?: string | ComponentType<any>;
    [key: string]: any;
  }

  export const Prism: ComponentType<SyntaxHighlighterProps>;
  export const SyntaxHighlighter: ComponentType<SyntaxHighlighterProps>;
  export const PrismLight: ComponentType<SyntaxHighlighterProps>;
  export const Default: ComponentType<SyntaxHighlighterProps>;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const vscDarkPlus: any;
  export const atomDark: any;
  export const base16AteliersulphurpoolLight: any;
  export const cb: any;
  export const coldarkCold: any;
  export const coldarkDark: any;
  export const coy: any;
  export const darcula: any;
  export const dark: any;
  export const dracula: any;
  export const duotoneDark: any;
  export const duotoneEarth: any;
  export const duotoneForest: any;
  export const duotoneLight: any;
  export const duotoneSea: any;
  export const duotoneSpace: any;
  export const funky: any;
  export const ghcolors: any;
  export const gruvboxDark: any;
  export const gruvboxLight: any;
  export const holiTheme: any;
  export const hopscotch: any;
  export const materialDark: any;
  export const materialLight: any;
  export const materialOceanic: any;
  export const nord: any;
  export const okaidia: any;
  export const oneDark: any;
  export const oneLight: any;
  export const pojoaque: any;
  export const prism: any;
  export const shadesOfPurple: any;
  export const solarizedDarkAtom: any;
  export const solarizedlight: any;
  export const synthwave84: any;
  export const tomorrow: any;
  export const twilight: any;
  export const vs: any;
  export const vscDarkPlus: any;
  export const xonokai: any;
  export const zTouch: any;
}