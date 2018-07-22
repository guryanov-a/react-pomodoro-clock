import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const SessionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Display = styled.div`
  border: 3px solid #292929;
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 15px;
  text-align: center;
`;

const ControlBtn = styled.button`
  margin: 0 10px;
`;

const Session = ({ time }) => (
  <SessionStyled>
    <Display>
      <h2 id="timer-label">Session</h2>
      <div id="time-left">{ time }</div>
    </Display>
    <div>
      <ControlBtn id="start_stop">
        <FontAwesomeIcon icon={ faPlay } />
        <FontAwesomeIcon icon={ faPause } />
      </ControlBtn>
      <ControlBtn id="reset">
        <FontAwesomeIcon icon={ faSync } />
      </ControlBtn>
    </div>
  </SessionStyled>
);

export default Session;