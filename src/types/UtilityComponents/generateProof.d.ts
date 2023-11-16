import { type proofSubmissionDetailsCustomConfig } from './ProofBox';
import { type modalHeaderCustomConfig } from '../designComponents/Modal';

export interface sessionInterface {
  sessionId: string;
  link: string;
};
export interface GenerateProofProps {
  appID: string;
  userID?: string;
  onSessionCreation?: (session: sessionInterface | undefined) => void;
  onProofSubmission?: (proofs: Proof[], sessionId: string) => void;
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

export const GenerateProof: React.FC<GenerateProofProps>;
