import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-wrap: ${(props) => props.wrap};
  order: ${(props) => props.order};
  flex-grow: ${(props) => props.grow};
  flex-shrink: ${(props) => props.shrink};
  flex-basis: ${(props) => props.basis};
  align-self: ${(props) => props.alignSelf};
  flex: ${(props) => props.flex};
  gap: ${(props) => props.gap};
  row-gap: ${(props) => props.rowGap};
  column-gap: ${(props) => props.columnGap};
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

const Flex = React.forwardRef(function Flex({ children, ...props }, ref) {
  return <FlexContainer {...props} ref={ref}>{children}</FlexContainer>;
});

Flex.defaultProps = {
  direction: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  wrap: 'nowrap',
  order: 0,
  frow: 0,
  shrink: 1,
  basis: 'auto',
  alignSelf: 'auto',
  flex: 'initial',
  gap: '0', // Default gap value
  rowGap: '0',
  columnGap: '0',
  width: 'auto', 
  minWidth: 'auto',
  maxWidth: 'none',
  height: 'auto',
  minHeight: 'auto',
  maxHeight: 'none',
  margin: 0,
  padding: 0
};

Flex.propTypes = {
  direction: PropTypes.oneOf([
    'row',
    'column',
    'row-reverse',
    'column-reverse',
  ]),
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  alignItems: PropTypes.oneOf([
    'stretch',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
  ]),
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  order: PropTypes.number,
  grow: PropTypes.number,
  shrink: PropTypes.number,
  basis: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alignSelf: PropTypes.oneOf([
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
    'stretch',
  ]),
  flex: PropTypes.string,
  gap: PropTypes.string,
  rowGap: PropTypes.string,
  columnGap: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  margin: PropTypes.string,
  padding: PropTypes.string
};

export default Flex;
