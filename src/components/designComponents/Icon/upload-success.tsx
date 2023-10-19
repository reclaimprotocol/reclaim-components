import React from 'react';
import PropTypes from 'prop-types';
import { type UploadSuccessProps, type UploadSuccessRef } from '../../../types/designComponents/Icons/uploadSuccess';

function geIconSize (size: UploadSuccessProps['size']): { height: number, width: number } {
  switch (size) {
    case 'xs': return { height: 12, width: 12 };
    case 's': return { height: 16, width: 16 };
    case 'm': return { height: 24, width: 24 };
    default: return { height: 16, width: 16 };
  }
}
const UploadSuccess = React.forwardRef(function UploadSuccess (props: UploadSuccessProps, ref: UploadSuccessRef) {
  const { size, color } = props;
  const { height, width } = geIconSize(size);
  return (
    <svg viewBox="0 0 24 24" height={height} width={width} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M9 13.2222L10.8462 15L15 11M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      </g>
    </svg>
  );
});

UploadSuccess.defaultProps = {
  size: 's',
  color: '#09244B'
};

UploadSuccess.propTypes = {
  size: PropTypes.oneOf(['xs', 's', 'm']),
  color: PropTypes.string

};

export default UploadSuccess;
