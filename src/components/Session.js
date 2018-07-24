import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { reset, setTimerTime } from '../actions';

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

    this.state = {
      isSession: true,
      currentTimer: props.sessionTimer,
    }
  }

  handleReset = () => {
    const {
      dispatch,
      sessionTimer,
    } = this.props;
    
    dispatch(reset());

    this.setState({
      isSession: true,
      currentTimer: sessionTimer,
    });

    dispatch(setTimerTime(sessionTimer));
  }

  render() {
    const { timerTime } = this.props;

    return (
      <SessionStyled>
        <Display>
          <h2 id="timer-label">Session</h2>
          <div id="time-left">{ timerTime }</div>
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

  componentDidMount() {
    const { currentTimer } = this.state;
    const { dispatch } = this.props;

    dispatch(setTimerTime(currentTimer));
  }

  componentWillUnmount() {

  }
}

const mapStateToProps = (state) => ({
  breakTimer: state.breakTimer,
  sessionTimer: state.sessionTimer,
  timerTime: state.timerTime,
});

export default connect(mapStateToProps)(Session);