import React from 'react';
import styled from 'styled-components';
import TimeControl from './TimeControl';

const TimeControlsStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const TimeControls = () => (
  <TimeControlsStyled>
    <TimeControl 
      id="break"
      title="Break Length"
      value={ 5 }
    />
    <TimeControl 
      id="session"
      title="Session Length"
      value={ 25 }
    />
  </TimeControlsStyled>
);

export default TimeControls;