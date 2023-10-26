import { type Ref } from 'react';

export interface CloseIconProps {
  size?: 'xs' | 's' | 'm';
  color?: string;
}

export type CloseIconRef = Ref<SVGSVGElement>;

export const CloseIcon: React.ForwardRefRenderFunction<CloseIconRef, CloseIconProps>;
