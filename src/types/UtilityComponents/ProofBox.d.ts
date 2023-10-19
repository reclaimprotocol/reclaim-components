import { type Ref } from 'react';

export interface ProofBoxProps {
  QRLink: string
  size?: number
  proofState: string
}

export type ProofBoxRef = Ref<HTMLDivElement>;
