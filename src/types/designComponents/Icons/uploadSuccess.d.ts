import { type Ref } from 'react';

export interface UploadSuccessProps {
  size?: 'xs' | 's' | 'm';
  color?: string;
}

export type UploadSuccessRef = Ref<SVGSVGElement>;
