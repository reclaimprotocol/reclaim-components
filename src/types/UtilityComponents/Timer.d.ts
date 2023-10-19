import { type Ref } from 'react';

export interface TimerProps {
  duration: number
}

export type TimerRef = Ref<HTMLDivElement>;
