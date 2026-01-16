import { useMemo } from 'react';
import type {
  UltraSrtNcstResponse,
  VilageFcstResponse,
  // UltraSrtFcstResponse,
} from '../model/VFSInterface';
import { parsingUtils } from '../utils/parsingUtils';

export function useGetWeatherData(
  ncstItems: UltraSrtNcstResponse[] | undefined,
  vilageItems: VilageFcstResponse[] | undefined,
  // ultraSrtFcstItems: UltraSrtFcstResponse[] | undefined,
  today: string
) {
  const { getCurrentTemp, getTodayTemps } = parsingUtils();

  if (!ncstItems || !vilageItems) {
    return {
      currentTemp: null,
      min: null,
      max: null,
      timeline: [],
    };
  }

  const currentTemp = getCurrentTemp(ncstItems);
  const { min, max, timeline } = getTodayTemps(vilageItems, today);

  return { currentTemp, min, max, timeline };
}
