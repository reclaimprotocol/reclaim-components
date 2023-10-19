export type ProofState = 'idle' | 'generating' | 'generated' | 'submission_success' | 'submission_failed';

export const PROOF_STATE: Record<string, ProofState> = {
  IDLE: 'idle',
  GENERATING: 'generating',
  GENERATED: 'generated',
  SUBMISSION_SUCCESS: 'submission_success',
  SUBMISSION_FAILED: 'submission_failed'
}
