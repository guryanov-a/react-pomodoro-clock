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
      dispatch(
        countdownChangeTime(activeTimer.time)
      );
    }

    dispatch(countdownStart());
  }

  handleReset = () => {
    const {
      dispatch,
      defaultTimer
    } = this.props;
    
    dispatch(reset());
    dispatch(countdownChangeTime(defaultTimer.defaultTime));
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
          <h2 id="timer-label">{ activeTimer.countdownTitle }</h2>
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
      nextTimer
    } = this.props;
    const countdownTime = countdown.time;
    const isCountdownActive = countdown.isActive;

    if (isCountdownActive && countdownTime === '00:00') {
      dispatch(countdownStop());
      dispatch(changeTimer(nextTimer));
      dispatch(countdownChangeTime(nextTimer.time));
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