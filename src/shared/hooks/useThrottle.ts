import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, delay = 200) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastExecuted.current);

    if (remaining <= 0) {
      lastExecuted.current = now;
      setThrottledValue(value);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
      timeoutRef.current = null;
    }, remaining);
  }, [value, delay]);

  return throttledValue;
}
