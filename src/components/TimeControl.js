import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledTimeControl = styled.div`
  text-align: center;
  padding: 15px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ControlBtn = styled.button`
  margin: 0 5px;
`;

const TimeControl = ({ id, title, value, onIncrease, onDecrease }) => (
  <StyledTimeControl>
    <h2 id={`${id}-label`}>{ title }</h2>
    <Controls>
      <ControlBtn id={`${id}-decrement`} onClick={ onDecrease }>
        <FontAwesomeIcon  icon={ faAngleDown } />
      </ControlBtn>
      <div id={`${id}-length`} className="value">{ value }</div>
      <ControlBtn id={`${id}-increment`} onClick={ onIncrease }>
        <FontAwesomeIcon icon={ faAngleUp } />
      </ControlBtn>
    </Controls>
  </StyledTimeControl>
);

export default React.memo(TimeControl);
