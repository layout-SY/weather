import { latLngToGridXY } from '../../address/utils/latLngToGridXY';
import { useQueryWithWeather } from '../../weather/hooks/useQueryWithWeather';
import { dateUtils } from '../../weather/utils/dateUtils';

export const useWeather = ( coords: { x: number; y: number } | null) => {

  const now = new Date();
  const { getUltraSrtNcstBase, getVilageBase } = dateUtils();
  const ncstBase = getUltraSrtNcstBase(now);
  const vilageBase = getVilageBase(now);

  const lat = coords?.y ?? 0;
  const lng = coords?.x ?? 0;
  const grid =
    Number.isFinite(lat) && Number.isFinite(lng)
      ? latLngToGridXY({ lat, lng })
      : null;
  const canFetchWeather = Boolean(grid);


  const {
    currentWeatherData,
    isCurrentWeatherLoading,
    currentWeatherError,
    todayWeatherData,
    isTodayWeatherLoading,
    todayWeatherError,
  } = useQueryWithWeather({
    ncstParams: {
      ...ncstBase,
      nx: grid?.x ?? 0,
      ny: grid?.y ?? 0,
      pageNo: 1,
      dataType: 'JSON',
    },
    vilageParams: {
      ...vilageBase,
      nx: grid?.x ?? 0,
      ny: grid?.y ?? 0,
      pageNo: 1,
      numOfRows: 500,
      dataType: 'JSON',
    },
    enabled: canFetchWeather,
  });

  const currentTemp = currentWeatherData?.find((item) => item.category === 'T1H')?.obsrValue ?? null;
  const todayMinTemp = todayWeatherData?.find((item) => item.category === 'TMN')?.fcstValue ?? null;
  const todayMaxTemp = todayWeatherData?.find((item) => item.category === 'TMX')?.fcstValue ?? null;

  return {
    currentTemp,
    isCurrentWeatherLoading,
    currentWeatherError,
    todayWeatherData,
    todayMinTemp,
    todayMaxTemp,
    isTodayWeatherLoading,
    todayWeatherError,
  };
};
