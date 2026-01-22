import { useEffect, useState } from 'react';
import { useThrottle } from './useThrottle';

interface WindowSize {
  width: number;
  height: number;
}

const getWindowSize = (): WindowSize => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export function useWindowSize(throttleMs = 200) {
  const [size, setSize] = useState<WindowSize>(getWindowSize);
  const throttledSize = useThrottle(size, throttleMs);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => setSize(getWindowSize());

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return throttledSize;
}
