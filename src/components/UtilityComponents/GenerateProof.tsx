import ReclaimSDK from '@reclaimprotocol/reclaim-client-sdk';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../designComponents/Modal';
import ProofBox from './ProofBox';
import { PROOF_STATE } from '../../util/constants';
import { ErrorHandler } from '../../util';
import { type GenerateProofProps, type GenerateProofRef, type sessionInterface } from '../../types/UtilityComponents/generateProof';

// The generateProof component that abstracts out entire reaclaim implementation
const GenerateProof = React.forwardRef(function GenerateProof (props: GenerateProofProps, ref: GenerateProofRef) {
  const {
    appID,
    userID,
    onProofSubmission,
    onProofSubmissionFailed
  } = props;

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

  async function generateSession (): Promise<void> {
    const userId = userID;
    setProofState(PROOF_STATE.GENERATING);
    const session = await reclaimSDK.generateSession({
      userId,
      onProofSubmissionSuccess: () => {
        setProofState(PROOF_STATE.SUBMISSION_SUCCESS);
        if (onProofSubmission !== null && typeof onProofSubmission !== 'undefined') onProofSubmission();
      },
      onError: (error) => {
        setProofState(PROOF_STATE.SUBMISSION_FAILED);
        console.log(error)
        if (onProofSubmissionFailed !== null && typeof onProofSubmissionFailed !== 'undefined') onProofSubmissionFailed();
      }
    })
    setProofState(PROOF_STATE.GENERATED);
    if (session !== null) {
      setSession(session);
    }
  }

  // render

  const handleClickToTrigger = async (): Promise<void> => {
    setIsModalOpen(true);
    await generateSession();
  }

  const renderButton = (): JSX.Element => {
    return <button className='reclaim-ds-button-generate-qr' onClick={handleClickToTrigger}>Generate Proof</button>;
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
			>
				<ProofBox QRLink={QRLink} proofState={proofState} />
			</Modal>
		</>
  );
});

GenerateProof.defaultProps = {
  onProofSubmission: () => {},
  onProofSubmissionFailed: () => {}
};

GenerateProof.propTypes = {
  appID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  onProofSubmission: PropTypes.func,
  onProofSubmissionFailed: PropTypes.func

};

export default GenerateProof;
