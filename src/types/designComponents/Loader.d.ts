import { type Ref } from 'react';

export interface LoaderProps {
  height?: number;
  width?: number;
  margin?: string;
  color?: string;
}

export type LoaderRef = Ref<SVGSVGElement>;
