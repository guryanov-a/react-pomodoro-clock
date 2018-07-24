import React from 'react';
import styled from 'styled-components';
import BreakTimeControl from './BreakTimeControl';
import SessionTimeControl from './SessionTimeControl';

const TimeControlsStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const TimeControls = ({ sessionTimer, breakTimer }) => (
  <TimeControlsStyled>
    <BreakTimeControl />
    <SessionTimeControl />
  </TimeControlsStyled>
);

export default TimeControls;