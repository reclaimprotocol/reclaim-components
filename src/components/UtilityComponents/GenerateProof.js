import ReclaimSDK from '@reclaimprotocol/reclaim-client-sdk';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../designComponents/Modal';
import ProofBox from './ProofBox';
import { PROOF_STATE } from '../../util/constants';
import { ErrorHandler } from '../../util';

const GenerateProof = React.forwardRef(function GenerateProof(props, ref) {
const {
	appID,
	userID,
	onProofSubmission,
	onProofSubmissionFailed
} = props;

	const [proofState, setProofState] = useState(PROOF_STATE.IDLE);
	const [session, setSession] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	// notify developer, if appID is not provided
	if (typeof appID === 'undefined') {
		ErrorHandler('appID required: Please provide unique app ID to GenerateProof component.');
	}
	if (typeof userID === 'undefined') {
		ErrorHandler('userID required: Please provide unique user ID to GenerateProof component.');
	}

	const reclaimSDK = new ReclaimSDK(appID);

    async function generateSession () {
        const userId = userID;
        setProofState(PROOF_STATE.GENERATING);
        const session = await reclaimSDK.generateSession({
            userId,
            onProofSubmissionSuccess: () => {
                setProofState(PROOF_STATE.SUBMISSION_SUCCESS);
								onProofSubmission();
            },
            onError: (error) => {
                setProofState(PROOF_STATE.SUBMISSION_FAILED);
                console.log(error)
								onProofSubmissionFailed();
            }
        })
        setProofState(PROOF_STATE.GENERATED);
        if (session) {
            setSession(session);
        }
    }

	// render


	const handleClickToTrigger = () => {
		setIsModalOpen(true);
		generateSession();
	}

	const renderButton = () => {
		if (proofState === PROOF_STATE.IDLE || proofState === PROOF_STATE.SUBMISSION_FAILED ) return <button className='reclaim-ds-button-generate-qr' onClick={handleClickToTrigger}>Generate Proof</button>;
		return <button className='reclaim-ds-button-generate-qr' disabled={proofState===PROOF_STATE.GENERATING} onClick={()=> setIsModalOpen(true)}>View QR</button>;
	};

	const QRLink = session && session.link || '';
	return (
		<>
			<div>{renderButton()}</div>
			<Modal
				isOpen={isModalOpen}
				onClose={() => {setIsModalOpen(false)}}
				overlayClassName="Reclaim-ds-modal-overlay"
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