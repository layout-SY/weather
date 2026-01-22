import type { RefObject } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CloudIcon, SunIcon } from '@heroicons/react/24/outline';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';

interface TimelineItem {
  fcstDate: number | string;
  fcstTime: number | string;
  fcstValue: number | string | null;
  skyCode: number | null;
  ptyCode: number | null;
}

const getTimelineIcon = (skyCode: number | null, ptyCode: number | null) => {
  if (ptyCode && ptyCode !== 0) {
    if ([2, 3, 6, 7].includes(ptyCode)) {
      return (
        <img
          src='/icons/snow.png'
          alt='cloud-rain'
          className='h-6 w-6 invert brightness-200'
        />
      );
    }
    return (
      <img
        src='/icons/rain.png'
        alt='cloud-rain'
        className='h-6 w-6 invert brightness-200'
      />
    );
  }
  if (skyCode === 3) {
    return (
      <img
        src='/icons/sunCloud.png'
        alt='cloud-rain'
        className='h-6 w-6 invert brightness-200'
      />
    );
  }
  if (skyCode === 4) {
    return <CloudIcon className='h-6 w-6 text-white/80' />;
  }
  return <SunIcon className='h-6 w-6 text-white/80' />;
};

interface TimelineSectionProps {
  isTodayWeatherLoading: boolean;
  timeline: TimelineItem[];
  containerRef: RefObject<HTMLDivElement | null>;
  scrollTimeline: (direction: 'left' | 'right') => void;
}

export const TimelineSection = ({
  isTodayWeatherLoading,
  timeline,
  containerRef,
  scrollTimeline,
}: TimelineSectionProps) => {
  return (
    <div className='w-full mt-6 border-t border-white/20 pt-4 pb-6'>
      {isTodayWeatherLoading ? (
        <div className='h-32 flex items-center justify-center text-white/50 italic'>
          <LoadingSpinner />
        </div>
      ) : timeline.length === 0 ? (
        <div className='h-32 flex items-center justify-center text-white/50 italic'>
          시간대별 날씨 정보가 없습니다
        </div>
      ) : (
        <div className='flex items-center gap-3'>
          <button
            type='button'
            onClick={() => scrollTimeline('left')}
            aria-label='이전 시간대'
            className='shrink-0 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur-md hover:bg-white/20'
          >
            <ChevronLeftIcon className='h-5 w-5' />
          </button>
          <div
            ref={containerRef}
            className='flex w-full gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          >
            {timeline.map((item) => {
              const hour = String(item.fcstTime).slice(0, 2);
              return (
                <div
                  key={`${item.fcstDate}-${item.fcstTime}`}
                  className='min-w-[72px] flex flex-col items-center gap-2'
                >
                  <span className='text-sm text-white/90'>{hour}시</span>
                  <div className='flex items-center gap-2'>
                    {getTimelineIcon(item.skyCode, item.ptyCode)}
                  </div>
                  <span className='text-lg font-semibold'>
                    {item.fcstValue}°
                  </span>
                </div>
              );
            })}
          </div>
          <button
            type='button'
            onClick={() => scrollTimeline('right')}
            aria-label='다음 시간대'
            className='shrink-0 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur-md hover:bg-white/20'
          >
            <ChevronRightIcon className='h-5 w-5' />
          </button>
        </div>
      )}
    </div>
  );
};
