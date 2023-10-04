import React, { useState, useEffect } from 'react';
import Flex from '../designComponents/Flex';
import styled from 'styled-components';

const StyledTimerText = styled.span`
  font-size: 3em;
  color: #9d0000;
`;

const Timer = ({ duration }) => {
  let durationInSeconds = duration;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
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
