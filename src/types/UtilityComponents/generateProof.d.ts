import { type proofSubmissionDetailsCustomConfig } from './ProofBox';
import { type modalHeaderCustomConfig } from '../designComponents/Modal';
export interface GenerateProofProps {
  appID: string;
  userID: string;
  onProofSubmission?: () => void;
  onProofSubmissionFailed?: () => void;
  customize?: {
    triggerButton?: {
      text?: string;
      style?: object;
    },
    modalHeader?: modalHeaderCustomConfig
    proofSubmissionDetails?: proofSubmissionDetailsCustomConfig
  }
}

export type GenerateProofRef = Ref<HTMLDivElement>;

export type Proof = {
  ownerPublicKey: string;
  timestampS: string;
  witnessAddresses: string[];
  signatures: string[];
  redactedParameters: string;
  epoch: number;
  identifier: string;
  extractedParameterValues?: Record<string, string | number>;
} & (ProofClaim | httpProof);

export type SubmittedProof = {
  parameters: string;
} & Proof;

export interface sessionInterface {
  sessionId: string;
  link: string;
};

export const GenerateProof: React.FC<GenerateProofProps>;
