import React, { PureComponent } from 'react';
import TimeControls from './TimeControls';
import Session from './Session';
import styled from 'styled-components';
import moment from 'moment';

const PomodoroApp = styled.div`
  padding: 120px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  text-align: center;
`;

class App extends PureComponent {
  render() {
    const time = moment().minute(25).seconds(0).format('mm:ss');

    return (
      <PomodoroApp>
        <Container>
          <PageTitle>Pomodoro clock</PageTitle>
          <TimeControls />
          <Session time={ time } />  
        </Container>
      </PomodoroApp>  
    );
  }
  componentDidMount() {
    const $script = require('scriptjs');

    $script('https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js');
  }
}

export default App;
