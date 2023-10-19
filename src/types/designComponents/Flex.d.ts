import { type CSSProperties, type Ref } from 'react';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type FlexJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export type FlexAlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';

export type alignSelf =
    'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexProps {
  direction?: FlexDirection;
  justifyContent?: FlexJustifyContent;
  alignItems?: FlexAlignItems;
  wrap?: FlexWrap;
  order?: number;
  grow?: number;
  shrink?: number;
  basis?: number | string;
  alignSelf?: alignSelf;
  flex?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  margin?: string;
  padding?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

export type FlexRef = Ref<HTMLDivElement>;
