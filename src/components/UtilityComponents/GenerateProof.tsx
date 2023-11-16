import ReclaimSDK from '@reclaimprotocol/reclaim-client-sdk';
import styled from 'styled-components';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../designComponents/Modal';
import ProofBox from './ProofBox';
import { PROOF_STATE } from '../../util/constants';
import { ErrorHandler } from '../../util';
import { type GenerateProofProps, type GenerateProofRef, type sessionInterface, type Proof } from '../../types/UtilityComponents/generateProof';

const StyledGenerateProofButton = styled.button`
  background-color: #f7f7e1;
  height: 32px;
  padding: 16px;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  box-sizing: border-box;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  color: #000000;
  cursor: pointer;
`;

// The generateProof component that abstracts out entire reaclaim implementation
const GenerateProof = React.forwardRef(function GenerateProof (props: GenerateProofProps, ref: GenerateProofRef) {
  const {
    appID,
    userID,
    onSessionCreation,
    onProofSubmission,
    onProofSubmissionFailed,
    customize
  } = props;

  const {
    triggerButton: triggerButtonCustomConfig,
    modalHeader: modalHeaderCustomConfig,
    proofSubmissionDetails: proofSubmissionDetailsCustomConfig
  } = customize ?? {};

  // local states
  const [proofState, setProofState] = useState(PROOF_STATE.IDLE);
  const [session, setSession] = useState<sessionInterface | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // notify developer, if appID is not provided
  if (typeof appID === 'undefined') {
    ErrorHandler('appID required: Please provide unique app ID to GenerateProof component.');
  }
  if (typeof userID === 'undefined') {
    ErrorHandler('userID required: Please provide unique user ID to GenerateProof component.');
  }

  // Instantiate ReclaimSDK with the appID.
  const reclaimSDK = new ReclaimSDK(appID);

  async function generateSession (): Promise<sessionInterface | undefined> {
    const userId = userID;
    setProofState(PROOF_STATE.GENERATING);
    const session: sessionInterface | undefined = await reclaimSDK.generateSession({
      userId,
      onProofSubmissionSuccess: (proofs: Proof[], sessionId: string) => {
        setProofState(PROOF_STATE.SUBMISSION_SUCCESS);
        if (onProofSubmission !== null && typeof onProofSubmission === 'function') onProofSubmission(proofs, sessionId);
      },
      onError: (error) => {
        setProofState(PROOF_STATE.SUBMISSION_FAILED);
        console.log(error)
        if (onProofSubmissionFailed !== null && typeof onProofSubmissionFailed === 'function') onProofSubmissionFailed();
      }
    })
    setProofState(PROOF_STATE.GENERATED);
    if (session !== null) {
      setSession(session);
      return session;
    }
  }

  // render

  const handleClickToTrigger = async (): Promise<void> => {
    setIsModalOpen(true);
    const generatedSession = await generateSession();
    if (onSessionCreation != null && typeof onSessionCreation === 'function') onSessionCreation(generatedSession);
  }

  const renderButton = (): JSX.Element => {
    const currentTriggerBtnText = ((triggerButtonCustomConfig?.text) != null) ? triggerButtonCustomConfig?.text : 'Generate Proof';
    const triggerButtonCustomStyle = ((triggerButtonCustomConfig?.style) != null) ? triggerButtonCustomConfig?.style : {};
    return <StyledGenerateProofButton className='reclaim-ds-button-generate-qr' onClick={handleClickToTrigger} style={triggerButtonCustomStyle}>{currentTriggerBtnText}</StyledGenerateProofButton>;
  };

  const QRLink = (session !== null && typeof session !== 'undefined') ? session.link : '';

  return (
		<>
			<div>{renderButton()}</div>
			<Modal
				isOpen={isModalOpen}
				onClose={() => { setIsModalOpen(false) }}
				className='Reclaim-ds-modal'
				role='dialog'
        modalHeaderCustomConfig={modalHeaderCustomConfig}
			>
				<ProofBox QRLink={QRLink} proofState={proofState} proofSubmissionDetailsCustomConfig={proofSubmissionDetailsCustomConfig} />
			</Modal>
		</>
  );
});

GenerateProof.defaultProps = {
  userID: '',
  onProofSubmission: () => {},
  onProofSubmissionFailed: () => {},
  onSessionCreation: () => {},
  customize: {}
};

GenerateProof.propTypes = {
  appID: PropTypes.string.isRequired,
  userID: PropTypes.string,
  onProofSubmission: PropTypes.func,
  onProofSubmissionFailed: PropTypes.func,
  onSessionCreation: PropTypes.func,
  customize: PropTypes.object

};

export default GenerateProof;
