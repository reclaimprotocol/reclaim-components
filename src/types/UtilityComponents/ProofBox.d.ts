import { type Ref } from 'react';
import { type ProofState } from '../../util/constants';
export interface proofSubmissionDetailsCustomConfig {
  successText?: string;
  failureText?: string;
  style?: object;
}
export interface ProofBoxProps {
  QRLink: string
  size?: number
  proofState?: ProofState,
  proofSubmissionDetailsCustomConfig?: proofSubmissionDetailsCustomConfig
}

export type ProofBoxRef = Ref<HTMLDivElement>;

export const ProofBox: React.FC<ProofBoxProps>;
