import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { changeTimerTime } from '../actions';
import TimeControl from './TimeControl';

class TimeControlContainer extends PureComponent {
  handleIncrease = () => {
    const { 
      dispatch,
      timer,
      timer: { time },
    } = this.props;
    const newTime = moment(time, 'mm:ss').add(1, 'm').format('mm:ss');

    dispatch(changeTimerTime(timer.id, newTime));
  }

  handleDecrease = () => {
    const { 
      dispatch,
      timer,
      timer: { time },
    } = this.props;
    const newTime = moment(time, 'mm:ss').subtract(1, 'm').format('mm:ss');

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
        value={ moment(time, 'mm:ss').format('m') }
        onIncrease={ this.handleIncrease }
        onDecrease={ this.handleDecrease }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentTimer = state.timers.items.find(timer => timer.id === ownProps.id);

  return {
    timer: currentTimer,
  }
};

export default connect(mapStateToProps)(TimeControlContainer);