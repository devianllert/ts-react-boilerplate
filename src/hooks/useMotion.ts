import { useState, useEffect } from 'react';

import { on, off } from '../utils/listeners';

export interface MotionState {
  acceleration: DeviceMotionEventAcceleration;
  accelerationIncludingGravity: DeviceMotionEventAcceleration;
  rotationRate: DeviceMotionEventRotationRate;
  interval: number;
}

const defaultState: MotionState = {
  acceleration: {
    x: null,
    y: null,
    z: null,
  },
  accelerationIncludingGravity: {
    x: null,
    y: null,
    z: null,
  },
  rotationRate: {
    alpha: null,
    beta: null,
    gamma: null,
  },
  interval: 16,
};

/**
 * Hook that uses device's acceleration sensor to track its motions.
 */

const useMotion = (initialState: MotionState = defaultState): MotionState => {
  const [state, setState] = useState(initialState);

  useEffect((): (() => void) => {
    const handler = (event: MotionState): void => {
      const {
        acceleration,
        accelerationIncludingGravity,
        rotationRate,
        interval,
      } = event;

      setState({
        acceleration,
        accelerationIncludingGravity,
        rotationRate,
        interval,
      });
    };

    on(window, 'devicemotion', handler);

    return (): void => {
      off(window, 'devicemotion', handler);
    };
  }, []);

  return state;
};

export default useMotion;
