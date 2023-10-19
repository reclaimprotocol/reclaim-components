import React, { useState, useEffect, type ReactNode } from 'react';
import Flex from '../designComponents/Flex';
import styled from 'styled-components';
import { type TimerProps } from '../../types/UtilityComponents/Timer';
const StyledTimerText = styled.span`
  font-size: 2em;
  color: #9d0000;
`;

const Timer = (props: TimerProps): ReactNode => {
  const { duration } = props;
  let durationInSeconds = duration;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateTimer = (): void => {
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = durationInSeconds % 60;

      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };

    updateTimer();

    const timerInterval = setInterval(() => {
      durationInSeconds--;
      if (durationInSeconds >= 0) {
        updateTimer();
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [durationInSeconds]);

  return (
    <Flex width='135px'>
      <StyledTimerText>{String(minutes).padStart(2, '0')}:</StyledTimerText>
      <StyledTimerText>{String(seconds).padStart(2, '0')}</StyledTimerText>
    </Flex>
  );
};

export default Timer;
