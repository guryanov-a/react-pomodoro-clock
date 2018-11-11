import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { changeTimerTime } from '../actions';
import TimeControl from './TimeControl';
import { getActiveTimer } from '../reducers/timers';

momentDurationFormatSetup(moment);

class TimeControlContainer extends PureComponent {
  handleIncrease = () => {
    const { 
      dispatch,
      timer,
    } = this.props;
    const newTime = moment.duration(timer.time, 'm').add(1, 'm').asMinutes();

    dispatch(changeTimerTime(timer.id, newTime));
  }

  handleDecrease = () => {
    const { 
      dispatch,
      timer,
    } = this.props;
    const newTime = moment.duration(timer.time, 'm').subtract(1, 'm').asMinutes();

    dispatch(changeTimerTime(timer.id, newTime));
  }

  render() {
    const {
      id,
      timer,
      timer: { time },
    } = this.props;

    return (
      <TimeControl 
        id={ id }
        { ...timer }
        value={ moment.duration(time, 'm').format('m') }
        onIncrease={ this.handleIncrease }
        onDecrease={ this.handleDecrease }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentTimer = state.timers.items.find(timer => timer.id === ownProps.id);

  return {
    activeTimer: getActiveTimer(state.timers),
    timer: currentTimer,
    countdown: state.countdown,
  };
};

export default connect(mapStateToProps)(TimeControlContainer);