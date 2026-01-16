import { useQuery } from '@tanstack/react-query';
import { getUltraSrtNcst, getVilageFcst } from '../api/fetchVFS';
import type { WeatherCommonRequestParams } from '../model/VFSInterface';

const weatherQueryKey = (params: WeatherCommonRequestParams) => ({
  base_date: params.base_date,
  base_time: params.base_time,
  nx: params.nx,
  ny: params.ny,
  pageNo: params.pageNo,
  dataType: params.dataType,
});

export function useUltraSrtNcst(params: WeatherCommonRequestParams) {
  return useQuery({
    queryKey: ['vfs', 'ultraSrtNcst', weatherQueryKey(params)],
    queryFn: () => getUltraSrtNcst(params),
  });
}

// export function useUltraSrtFcst(params: WeatherCommonRequestParams) {
//   return useQuery({
//     queryKey: ['vfs', 'ultraSrtFcst', params],
//     queryFn: () => getUltraSrtFcst(params),
//   });
// }

export function useVilageFcst(params: WeatherCommonRequestParams) {
  return useQuery({
    queryKey: ['vfs', 'vilageFcst', weatherQueryKey(params)],
    queryFn: () => getVilageFcst(params),
  });
}
