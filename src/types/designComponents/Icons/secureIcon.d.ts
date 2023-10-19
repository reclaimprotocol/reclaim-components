import { type Ref } from 'react';

export interface SecureIconProps {
  size?: 'xs' | 's' | 'm';
  color?: string;
}

export type SecureIconRef = Ref<SVGSVGElement>;

export const SecureIcon: React.ForwardRefRenderFunction<SecureIconRef, SecureIconProps>;
