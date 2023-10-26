import React, { type ReactNode } from 'react';
import PropTypes from 'prop-types';
import { type CloseIconProps, type CloseIconRef } from '../../../types/designComponents/Icons/closeStrokeIcon';

function geIconSize (size: CloseIconProps['size']): { height: number, width: number } {
  switch (size) {
    case 'xs': return { height: 12, width: 12 };
    case 's': return { height: 16, width: 16 };
    case 'm': return { height: 24, width: 24 };
    default: return { height: 16, width: 16 };
  }
}
const CloseIcon = React.forwardRef(function SecureIcon (props: CloseIconProps, ref: CloseIconRef): ReactNode {
  const { size, color } = props;
  const { height, width } = geIconSize(size);
  return (
    <svg viewBox="0 0 16 16" height={height} width={width} version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
      <path
        fill={color}
        d="M8.70711 8.00001L13.3536 3.35356L12.6465 2.64645L8.00001 7.2929L3.35356 2.64645L2.64645 3.35356L7.2929 8.00001L2.64645 12.6465L3.35356 13.3536L8.00001 8.70711L12.6465 13.3536L13.3536 12.6465L8.70711 8.00001Z"
      ></path>
    </svg>
  );
});

CloseIcon.defaultProps = {
  size: 's',
  color: '#09244B'
};

CloseIcon.propTypes = {
  size: PropTypes.oneOf(['xs', 's', 'm']),
  color: PropTypes.string

};

export default CloseIcon;
