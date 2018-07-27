import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { reset, changeDisplayTime } from '../actions';

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
  getCurrentTimer = () => {
    const { timers } = this.props;

    return timers.items.find(timer => {
      return timers.currentTimer === timer.id;
    });
  }

  getDefaultTimer = () => {
    const { timers } = this.props;
    
    return timers.items.find(timer => {
      return timer.id === timers.defaultTimer;
    });
  }

  handleReset = () => {
    const {
      dispatch,
    } = this.props;
    
    dispatch(reset());
    dispatch(changeDisplayTime(this.getDefaultTimer().defaultTime));
  }

  render() {
    return (
      <SessionStyled>
        <Display>
          <h2 id="timer-label">Session</h2>
          <div id="time-left">{ this.getCurrentTimer().time }</div>
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
}

const mapStateToProps = (state) => ({
  timers: state.timers,
});

export default connect(mapStateToProps)(Session);