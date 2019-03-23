import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { changeTimerTime } from '../actions';
import TimeControl from './TimeControl';
import { getActiveTimer } from '../reducers/timers';

class TimeControlContainer extends PureComponent {
  handleIncrease = () => {
    const {
      dispatch,
      timer,
    } = this.props;
    const newTime = timer.time + 1;

    dispatch(changeTimerTime(timer.id, newTime));
  };

  handleDecrease = () => {
    const {
      dispatch,
      timer,
    } = this.props;
    const newTime = timer.time - 1;

    dispatch(changeTimerTime(timer.id, newTime));
  };

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
        value={ time }
        onIncrease={ this.handleIncrease }
        onDecrease={ this.handleDecrease }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentTimer = state.timers.items.find(timer => timer.id === ownProps.id);

  return {
    activeTimer: getActiveTimer(state),
    timer: currentTimer,
    countdown: state.countdown,
  };
};

export default connect(mapStateToProps)(TimeControlContainer);
