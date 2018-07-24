import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TimeControl from './TimeControl';
import moment from 'moment';

const TimeControlsStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const TimeControls = ({ sessionTimer, breakTimer }) => (
  <TimeControlsStyled>
    <TimeControl 
      id="break"
      title="Break Length"
      value={ moment(breakTimer, 'mm:ss').format('m') }
    />
    <TimeControl 
      id="session"
      title="Session Length"
      value={ moment(sessionTimer, 'mm:ss').format('m') }
    />
  </TimeControlsStyled>
);

const mapStateToProps = (state) => ({
  sessionTimer: state.sessionTimer,
  breakTimer: state.breakTimer,
});

export default connect(mapStateToProps)(TimeControls);