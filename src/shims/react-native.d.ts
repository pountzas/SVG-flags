declare module 'react-native' {
  import type { ComponentType, ReactNode } from 'react';

  export type StyleProp<T> = T | T[] | null | undefined;

  export interface ViewStyle {
    width?: number | string;
    height?: number | string;
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    justifyContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
    overflow?: 'visible' | 'hidden' | 'scroll';
    [key: string]: unknown;
  }

  export interface TextStyle extends ViewStyle {
    color?: string;
    fontSize?: number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  }

  export interface ViewProps {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    accessibilityLabel?: string;
  }

  export interface TextProps {
    style?: StyleProp<TextStyle>;
    children?: ReactNode;
  }

  export interface PressableProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    accessibilityLabel?: string;
    accessibilityRole?: string;
  }

  export const View: ComponentType<ViewProps>;
  export const Text: ComponentType<TextProps>;
  export const Pressable: ComponentType<PressableProps>;
}

declare module 'react-native-svg' {
  import type { ComponentType } from 'react';

  export interface SvgXmlProps {
    xml: string;
    width?: number | string;
    height?: number | string;
    accessibilityLabel?: string;
  }

  export const SvgXml: ComponentType<SvgXmlProps>;
}

declare const __DEV__: boolean | undefined;
