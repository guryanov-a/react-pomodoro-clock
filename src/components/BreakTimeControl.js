import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { changeBreakTime } from '../actions';
import TimeControl from './TimeControl';

class BreakTimeControl extends PureComponent {
  handleIncrease = () => {
    const { 
      dispatch,
      breakTimer,
    } = this.props;

    dispatch(changeBreakTime(moment(breakTimer, 'mm:ss').add(1, 'm')));
  }

  handleDecrease = () => {
    const { 
      dispatch,
      breakTimer,
    } = this.props;

    dispatch(changeBreakTime(moment(breakTimer, 'mm:ss').subtract(1, 'm')));
  }

  render() {
    const { breakTimer } = this.props;

    return (
      <TimeControl 
        id="break"
        title="Break Length"
        value={ moment(breakTimer, 'mm:ss').format('m') }
        onIncrease={ this.handleIncrease }
        onDecrease={ this.handleDecrease }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  breakTimer: state.breakTimer,
});

export default connect(mapStateToProps)(BreakTimeControl);