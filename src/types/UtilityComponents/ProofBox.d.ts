import { type Ref } from 'react';
import { type ProofState } from '../../util/constants';
export interface ProofBoxProps {
  QRLink: string
  size?: number
  proofState?: ProofState
}

export type ProofBoxRef = Ref<HTMLDivElement>;

export const ProofBox: React.FC<ProofBoxProps>;
