import ReclaimSDK from '@reclaimprotocol/reclaim-client-sdk';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../designComponents/Modal';
import QRCode from "react-qr-code";

import { ErrorHandler } from '../../util';

const GenerateProof = React.forwardRef(function GenerateProof(props, ref) {
const {
	appID,
	userID,
	onProofSubmission,
	onProofSubmissionFailed
} = props;

	const [sessionState, setSessionState] = useState('IDLE');
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
        setSessionState('PROCESSING');
        const session = await reclaimSDK.generateSession({
            userId,
            onProofSubmissionSuccess: () => {
                setSessionState('COMPLETED');
								onProofSubmission();
            },
            onError: (error) => {
                setSessionState('FAILED');
                console.log(error)
								onProofSubmissionFailed();
            }
        })
        setSessionState('GENERATED');
        if (session) {
            setSession(session);
            setIsModalOpen(true);
        }
    }

	// render


	const renderButton = () => {
		if (sessionState === 'IDLE' || sessionState === 'FAILED' ) return <button className='reclaim-ds-button-generate-qr' onClick={generateSession}>Generate QR</button>;
		return <button className='reclaim-ds-button-generate-qr' disabled={sessionState==='PROCESSING'} onClick={()=> setIsModalOpen(true)}>View QR</button>;
	};
	const renderAcknowledgement = () => {
		if (sessionState === 'PROCESSING') return <span className='reclaim-generate-proof-ack'>Generating...</span>;
		if (sessionState === 'COMPLETED') return <span className='reclaim-generate-proof-ack'>Proof Submitted Successfully</span>;
		if (sessionState === 'FAILED') return <span className='reclaim-generate-proof-ack'>Proof Submission Failed</span>;
	};

	const QRLink = session && session.link || '';
	return (
		<>
			<div>{renderButton()}</div>
			{renderAcknowledgement()}
			<Modal
				isOpen={isModalOpen}
				onClose={() => {setIsModalOpen(false)}}
				overlayClassName="Reclaim-ds-modal-overlay"
				className='Reclaim-ds-modal'
				role='dialog'
			>
				<QRCode value={QRLink} size={200} />
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