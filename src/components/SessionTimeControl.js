import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { changeSessionTime, setTimerTime } from '../actions';
import TimeControl from './TimeControl';

class SessionTimeControl extends PureComponent {
  handleIncrease = () => {
    const { 
      dispatch,
      sessionTimer,
    } = this.props;
    const newTime = moment(sessionTimer, 'mm:ss').add(1, 'm').format('mm:ss');

    dispatch(changeSessionTime(newTime));
    dispatch(setTimerTime(newTime));
  }

  handleDecrease = () => {
    const { 
      dispatch,
      sessionTimer,
    } = this.props;
    const newTime = moment(sessionTimer, 'mm:ss').subtract(1, 'm').format('mm:ss');

    dispatch(changeSessionTime(newTime));
    dispatch(setTimerTime(newTime));
  }

  render() {
    const { sessionTimer } = this.props;

    return (
      <TimeControl 
        id="session"
        title="Session Length"
        value={ moment(sessionTimer, 'mm:ss').format('m') }
        onDecrease={ this.handleDecrease }
        onIncrease={ this.handleIncrease }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  sessionTimer: state.sessionTimer,
});

export default connect(mapStateToProps)(SessionTimeControl);