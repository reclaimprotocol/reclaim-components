import React, { useState, useEffect, type ReactNode } from 'react';
import Flex from '../designComponents/Flex';
import styled from 'styled-components';
import { type TimerProps, type ProgressBarProps } from '../../types/UtilityComponents/Timer';

const StyledProgressBarContainer = styled.div<ProgressBarProps>`
  background-color: #d8d8d8;
  border-radius: 4px;
  position: relative;
  margin: 16px 0;
  height: 8px;
  width: ${(props) => props.width};
`;

const StyledProgressBar = styled.div<ProgressBarProps>`
  background: #0099ff;
  border-radius: 4px;
  height: 100%;
  transition: 1s ease 0.3s;
  width: ${(props) => props.width};
`;

const StyledFlex = styled(Flex)`
  font-family: 'circular';
  color: #8e8e8e;
  font-size: 1em;
  margin-top: 12px;
`;

const Timer = (props: TimerProps): ReactNode => {
  const { duration } = props;
  let durationInSeconds = duration;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(durationInSeconds);

  useEffect(() => {
    const updateTimer = (): void => {
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = durationInSeconds % 60;

      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
      setRemainingTime(durationInSeconds);
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

  const barPercentage = (remainingTime / duration) * 100;
  return (
    <Flex width='100%'>
      <StyledProgressBarContainer className='reclaim-ds-progress-bar-container' width='100%'>
        <StyledProgressBar className='reclaim-ds-progress-bar' width={barPercentage + '%'} />
        <StyledFlex>Time remains: <b>&nbsp;{minutes}:{seconds}&nbsp;</b>min</StyledFlex>
      </StyledProgressBarContainer>
    </Flex>
  );
};

export default Timer;
