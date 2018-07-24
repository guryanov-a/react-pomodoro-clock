import React from 'react';
import { connect } from 'react-redux';
import TimeControl from './TimeControl';
import moment from 'moment';

const SessionTimeControl = ({ sessionTimer }) => (
  <TimeControl 
    id="session"
    title="Session Length"
    value={ moment(sessionTimer, 'mm:ss').format('m') }
  />
);

const mapStateToProps = (state) => ({
  sessionTimer: state.sessionTimer,
});

export default connect(mapStateToProps)(SessionTimeControl);