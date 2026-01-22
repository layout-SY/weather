import { useQuery } from '@tanstack/react-query';
import { getUltraSrtNcst, getVilageFcst } from '../api/fetchVFS';
import type { WeatherCommonRequestParams } from '../model/VFSInterface';

const weatherQueryKey = (params: WeatherCommonRequestParams) => ({
  base_date: params.base_date,
  base_time: params.base_time,
  nx: params.nx,
  ny: params.ny,
  pageNo: params.pageNo,
});

interface UseQueryWithWeatherProps {
  ncstParams: WeatherCommonRequestParams;
  vilageParams: WeatherCommonRequestParams;
  enabled?: boolean;
}

export const useQueryWithWeather = ({
  ncstParams,
  vilageParams,
  enabled = true,
}: UseQueryWithWeatherProps) => {
  const {
    data: currentWeatherData,
    isLoading: currentWeatherLoading,
    error: currentWeatherError,
  } = useQuery({
    queryKey: ['vfs', 'ultraSrtNcst', weatherQueryKey(ncstParams)],
    queryFn: () => getUltraSrtNcst(ncstParams),
    enabled,
  });

  const {
    data: todayWeatherData,
    isLoading: todayWeatherLoading,
    error: todayWeatherError,
  } = useQuery({
    queryKey: ['vfs', 'vilageFcst', weatherQueryKey(vilageParams)],
    queryFn: () => getVilageFcst(vilageParams),
    enabled,
  });

  return {
    currentWeatherData,
    isCurrentWeatherLoading: currentWeatherLoading,
    currentWeatherError: currentWeatherError,
    todayWeatherData,
    isTodayWeatherLoading: todayWeatherLoading,
    todayWeatherError: todayWeatherError,
  };
};
