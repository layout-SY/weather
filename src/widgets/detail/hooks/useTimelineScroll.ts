import { useCallback, useRef } from 'react';

export const useTimelineScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollTimeline = useCallback((direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  return {
    containerRef,
    scrollTimeline,
  };
};
