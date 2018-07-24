import React from 'react';
import { connect } from 'react-redux';
import TimeControl from './TimeControl';
import moment from 'moment';

const BreakTimeControl = ({ breakTimer }) => (
  <TimeControl 
    id="break"
    title="Break Length"
    value={ moment(breakTimer, 'mm:ss').format('m') }
  />
);

const mapStateToProps = (state) => ({
  breakTimer: state.breakTimer,
});

export default connect(mapStateToProps)(BreakTimeControl);