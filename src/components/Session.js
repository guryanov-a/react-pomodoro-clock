import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import {
  reset,
  countdownStart,
  countdownPause,
  countdownChangeTime,
  audioSet,
} from '../actions';
import { getActiveTimer, getDefaultTimer, getNextTimer } from '../reducers/timers';

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
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }

  handlePause = () => {
    const {
      dispatch,
    } = this.props;

    dispatch(countdownPause());
  };

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
  };

  handleReset = () => {
    const {
      dispatch,
      defaultTimer
    } = this.props;


    dispatch(reset());
    dispatch(countdownChangeTime(defaultTimer.defaultTime));
  };

  componentDidMount() {
    const {
      dispatch,
      activeTimer,
    } = this.props;

    dispatch(countdownChangeTime(activeTimer.time));
    dispatch(audioSet(this.audio.current));
  }

  render() {
    const {
      activeTimer,
      countdown,
    } = this.props;

    return (
      <SessionStyled>
        <Display>
          <h2 id="timer-label">{ activeTimer.countdownTitle }</h2>
          <div id="time-left">{ countdown.time }</div>
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
        <audio
          id="beep"
          hidden
          ref={this.audio}
        >
          <source src="air_horn.mp3" type="audio/mpeg" />
        </audio>
      </SessionStyled>
    );
  }
}

const mapStateToProps = (state) => ({
  activeTimer: getActiveTimer(state.timers),
  defaultTimer: getDefaultTimer(state.timers),
  nextTimer: getNextTimer(state.timers),
  countdown: state.countdown,
});

export default connect(mapStateToProps)(Session);
