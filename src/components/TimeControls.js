import React from 'react';
import styled from 'styled-components';
import TimeControlContainer from './TimeControlContainer';

const TimeControlsStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const TimeControls = () => (
  <TimeControlsStyled>
    <TimeControlContainer
      id="break"
    />
    <TimeControlContainer
      id="session"
    />
  </TimeControlsStyled>
);

export default TimeControls;