import ReclaimSDK from '@reclaimprotocol/reclaim-client-sdk';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ErrorHandler } from '../../util';

const SimpleReclaimApp = React.forwardRef(function SimpleReclaimApp(props, ref) {
const {
	appID,
	userID,
	onProofSubmission,
	onProofSubmissionFailed
} = props;

	const [session, setSession] = useState();
	const [sessionState, setSessionState] = useState('IDLE');
	const [isProofSubmitted, setIsProofSubmitted] = useState(false);

	// notify developer, if appID is not provided
	if (typeof appID === 'undefined') {
		ErrorHandler('appID required: Please provide unique app ID to SimpleReclaimApp component.');
	}
	if (typeof userID === 'undefined') {
		ErrorHandler('userID required: Please provide unique user ID to SimpleReclaimApp component.');
	}

	const reclaimSDK = new ReclaimSDK(appID);

	useEffect(() => {
		async function generateSession () {
			const userId = userID;
			setSessionState('GENERATING_VERIFICATION_LINK')
			const session = await reclaimSDK.generateSession({
				userId,
				onProofSubmissionSuccess: () => {
					setSessionState('COMPLETED');
				},
				onError: (error) => {
					setSessionState('FAILED');
					console.log(error)
				}
			})
			setSession(session);
			console.log(session);
		}
		generateSession();
	}, []);

  if (sessionState === 'IDLE') return <div>Idle</div>;
  if (sessionState === 'GENERATING_VERIFICATION_LINK') return <div>Generating verification link...</div>;
  if (sessionState === 'GENERATED_VERIFICATION_LINK') return <div>Generated verification link..</div>;
  if (sessionState === 'COMPLETED') return <div>Completed</div>;
  if (sessionState === 'FAILED') return <div>Failed</div>;
	return <div>Try again</div>;
});

SimpleReclaimApp.defaultProps = {
	onProofSubmission: () => {},
	onProofSubmissionFailed: () => {}
};
  
SimpleReclaimApp.propTypes = {
	appID: PropTypes.string.isRequired,
	userID: PropTypes.string.isRequired,
	onProofSubmission: PropTypes.func,
	onProofSubmissionFailed: PropTypes.func

};
  
export default SimpleReclaimApp;