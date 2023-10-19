import React, { useEffect, useState, type ReactNode } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
import Timer from './Timer';
import Flex from '../designComponents/Flex';
import Loader from '../designComponents/Loader';
import { PROOF_STATE } from '../../util/constants';
import UploadFail from '../designComponents/Icon/upload-fail';
import UploadSuccess from '../designComponents/Icon/upload-success';
import { type ProofBoxProps, type ProofBoxRef } from '../../types/UtilityComponents/ProofBox';

const SESSION_TIMEOUT = 300;
const StyledFlex = styled(Flex)`
  font-family: 'circular';
`;

const ProofBox = React.forwardRef(function ProofBox (props: ProofBoxProps, ref: ProofBoxRef) {
  const { QRLink, size, proofState } = props;
  const [isQRGenerated, setIsQRGenerated] = useState(false);

  useEffect(() => {
    if (proofState === PROOF_STATE.GENERATED) setIsQRGenerated(true);
  }, [proofState]);

  const renderProofSubmissionState = (): ReactNode => {
    if (proofState === PROOF_STATE.SUBMISSION_SUCCESS) {
      return <StyledFlex margin='auto' width='200px' alignItems='center' columnGap='6px'><UploadSuccess size='m' color='#009a00' /> Submission Successful </StyledFlex>;
    }
    if (proofState === PROOF_STATE.SUBMISSION_FAILED) {
      return <StyledFlex margin='auto' width='200px' alignItems='center' columnGap='6px'><UploadFail size='m' color='#a40000' /> Submission Failed</StyledFlex>; ;
    }
    if (isQRGenerated) {
      return (
					<StyledFlex margin='auto' direction='row' width='200px' justifyContent='space-between'>
						<Timer duration={SESSION_TIMEOUT} />
					</StyledFlex>
      );
    }
  };

  return (
        <Flex direction='column' margin='16px 0px' ref={ref}>
						<Flex direction='column' rowGap='16px'>
							{ !isQRGenerated && (<Loader height={200} width={100} color='#c5e4ff' />)}
							{ isQRGenerated && (<QRCode value={QRLink} size={size} style={{ width: '100%' }} />)}
							{renderProofSubmissionState()}
						</Flex>
        </Flex>
  );
});
export default ProofBox;

ProofBox.defaultProps = {
  size: 200
};
ProofBox.propTypes = {
  QRLink: PropTypes.string.isRequired,
  size: PropTypes.number,
  proofState: PropTypes.string.isRequired
};
