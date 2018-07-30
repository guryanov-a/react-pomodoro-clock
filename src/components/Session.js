import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { reset, countdownStart, countdownStop, countdownChangeTime, changeTimer } from '../actions';
import { getCurrentTimer, getDefaultTimer, getNextTimer } from '../reducers/timers';

momentDurationFormatSetup(moment);

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

class Session extends PureComponent {
  handleStart = () => {
    const {
      dispatch,
    } = this.props;

    dispatch(countdownStart());
  }

  handleReset = () => {
    const {
      dispatch,
    } = this.props;
    
    dispatch(reset());
  }

  render() {
    const {
      currentTimer,
    } = this.props;

    const time = moment.duration(currentTimer.time, 'm').format('mm:ss');

    return (
      <SessionStyled>
        <Display>
          <h2 id="timer-label">Session</h2>
          <div id="time-left">{ time }</div>
        </Display>
        <div>
          <ControlBtn id="start_stop" onClick={ this.handleStart }>
            <FontAwesomeIcon icon={ faPlay } />
            <FontAwesomeIcon icon={ faPause } />
          </ControlBtn>
          <ControlBtn id="reset" onClick={ this.handleReset }>
            <FontAwesomeIcon icon={ faSync } />
          </ControlBtn>
        </div>
      </SessionStyled>
    );
  }

  componentDidUpdate() {
    const { 
      dispatch,
      countdown,
      nextTimer,
      currentTimer,
    } = this.props;
    const countdownTime = countdown.time;
    const isCountdownActive = countdown.isActive;

    if (isCountdownActive && countdownTime === '00:00') {
      dispatch(countdownStop());
      dispatch(changeTimer(nextTimer));
      dispatch(countdownChangeTime(currentTimer.time));
      dispatch(countdownStart());
    }
  }
}

const mapStateToProps = (state) => ({
  currentTimer: getCurrentTimer(state.timers),
  defaultTimer: getDefaultTimer(state.timers),
  nextTimer: getNextTimer(state.timers),
  countdown: state.countdown,
});

export default connect(mapStateToProps)(Session);