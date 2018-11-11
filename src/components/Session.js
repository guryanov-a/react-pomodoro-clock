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
  playPromise;

  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }

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
    
    if (this.playPromise !== undefined) {
      this.playPromise
        .then(_ => {
          this.audio.current.pause();
          this.audio.current.currentTime = 0;
        });
    }
    
    dispatch(reset());
    dispatch(countdownChangeTime(defaultTimer.defaultTime));
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
          <source src={process.env.PUBLIC_URL + 'air_horn.mp3'} type="audio/mpeg" />
        </audio>
      </SessionStyled>
    );
  }

  componentDidMount() {
    const { 
      dispatch,
      activeTimer,
    } = this.props;

    dispatch(countdownChangeTime(activeTimer.time));
  }

  componentDidUpdate() {
    const { 
      dispatch,
      countdown,
      nextTimer
    } = this.props;

    if (countdown.isActive && countdown.time === '00:00') {
      dispatch(countdownStop());
      this.playPromise = this.audio.current.play();
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