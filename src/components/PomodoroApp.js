import React, { useEffect } from 'react';
import TimeControls from './TimeControls';
import Session from './Session';
import styled from 'styled-components';

const PomodoroAppStyled = styled.div`
  padding: 120px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  text-align: center;
`;

function PomodoroApp() {
  useEffect(() => {
    const $script = require('scriptjs');

    $script('https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js');
  }, []);

  return (
    <PomodoroAppStyled>
      <Container>
        <PageTitle>Pomodoro clock</PageTitle>
        <TimeControls />
        <Session />
      </Container>
    </PomodoroAppStyled>
  );
}

export default React.memo(PomodoroApp);
