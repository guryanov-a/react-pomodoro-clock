import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { 
  reset, 
  countdownStart, 
  countdownStop, 
  countdownPause,
  countdownChangeTime, 
  changeTimer,
} from '../actions';
import { getActiveTimer, getDefaultTimer, getNextTimer } from '../reducers/timers';

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
  handlePause = () => {
    const {
      dispatch,
    } = this.props;

    dispatch(countdownPause());
  }

  handleStart = () => {
    const {
      dispatch,
      activeTimer,
      countdown,
    } = this.props;

    if (!countdown.isPaused) {
      const timeToSet = moment
        .duration(activeTimer.time, 'm')
        .format('mm:ss');

      dispatch(
        countdownChangeTime(timeToSet)
      );
    }

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
      activeTimer,
      countdown,
    } = this.props;
    const timerTime = moment.duration(activeTimer.time, 'm').format('mm:ss');
    const time = countdown.isActive ? countdown.time : timerTime;

    return (
      <SessionStyled>
        <Display>
          <h2 id="timer-label">Session</h2>
          <div id="time-left">{ time }</div>
        </Display>
        <div>
          <ControlBtn 
            id="start_stop" 
            onClick={ 
              countdown.isActive && !countdown.isPaused
                ? this.handlePause
                : this.handleStart
            }
          >
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
      activeTimer,
    } = this.props;
    const countdownTime = countdown.time;
    const isCountdownActive = countdown.isActive;

    if (isCountdownActive && countdownTime === '00:00') {
      dispatch(countdownStop());
      dispatch(changeTimer(nextTimer));
      dispatch(countdownChangeTime(activeTimer.time));
      dispatch(countdownStart());
    }
  }
}

const mapStateToProps = (state) => ({
  activeTimer: getActiveTimer(state.timers),
  defaultTimer: getDefaultTimer(state.timers),
  nextTimer: getNextTimer(state.timers),
  countdown: state.countdown,
});

export default connect(mapStateToProps)(Session);