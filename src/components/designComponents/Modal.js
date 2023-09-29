import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';

const BACKGROUND_MODAL_BACKDROP = 'rgba(26, 26, 26, 0.6)';


const StyledModalHeading = styled.h3`
	font-size: 16px;
	line-height: 1.28;
	letter-spacing: -0.12px;
  line-height: 20px;
  margin-bottom: 12px;
`;

const StyledHeadingWrapper = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
	gap: 16px;
	padding: 12px 0px 8px 0px;
`;

const StyledCloseButtonWrapper = styled.span`
  position: relative;
  left: 16px;
  top: 4px;
`;
const StyledModalCloseBtn = styled.button`
	background-color: transparent;
	color: #6B6B6B;
	padding: 4px 12px 6px;
	BORDER: transparent;
	font-size: 24px;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background-color: #EDEDED;
	}
`;

const ModalHeader = React.forwardRef(function ModalHeader(props, ref) {
  const {
    heading,
    onClose
  } = props;
  return (
    <StyledHeadingWrapper ref={ref}>
      <StyledModalHeading>
				{heading}
			</StyledModalHeading>
			<StyledCloseButtonWrapper>
          <StyledModalCloseBtn onClick={onClose}>
						x
					</StyledModalCloseBtn>
        </StyledCloseButtonWrapper>
    </StyledHeadingWrapper>
  );
});

ModalHeader.defaultProps = {
  onClose: () => {}
};

ModalHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  onClose: PropTypes.func
};

const StyledModal = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  flex-direction: column;
  max-height: 96vh;
  align-self: center;
  border-radius: 16px;
  padding: 34px;
	padding-top: 0px;
  box-shadow: 0 16px 24px -8px rgba(107, 107, 107, 0.24);
`;

const Modal = React.forwardRef(function Modal(props, ref) {
    const {
      onClose,
      isOpen,
      children,
      id,
      className
    } = props;
  
    const defaultModalStyles = {
      overlay: {
        position: 'fixed',
        backgroundColor: BACKGROUND_MODAL_BACKDROP
      },
      content: {
        display: 'flex',
        position: 'relative',
        border: 'none',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        height: '100%',
        overflow: 'hidden',
        background: 'none',
        padding: 0,
        maxWidth: '648px',
        width: 'max-content'
      }
    };
  
  
    // This effect is added, to prevent scroll on overlay content when modal is open.
    useEffect(() => {
      const bodyElement = document && document.body;
      if (bodyElement) {
        // unset resets the style to its actual inherited value
        bodyElement.style.overflow = isOpen ? 'hidden' : 'unset';
      }
    }, [isOpen]);
  
    return (
      <ReactModal
        isOpen={isOpen}
        style={defaultModalStyles}
        onRequestClose={onClose}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc
      >
        <StyledModal
          id={id}
          className={className}
          ref={ref}
        >
					<ModalHeader heading='Scan the QR code to submit proof' onClose={onClose} />
          {children}
        </StyledModal>
      </ReactModal>
    );
  });
  
  Modal.defaultProps = {
    isOpen: false,
    id: '',
    className: ''
  };
  
  Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    id: PropTypes.string,
    className: PropTypes.string
  };
  
  Modal.displayName = 'Modal';

  export default Modal;