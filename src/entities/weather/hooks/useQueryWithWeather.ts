import { useQuery } from '@tanstack/react-query';
import { getUltraSrtNcst, getVilageFcst } from '../api/fetchVFS';
import type { WeatherCommonRequestParams } from '../model/VFSInterface';

export function useUltraSrtNcst(params: WeatherCommonRequestParams) {
  return useQuery({
    queryKey: ['vfs', 'ultraSrtNcst', params],
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
    queryKey: ['vfs', 'vilageFcst', params],
    queryFn: () => getVilageFcst(params),
  });
}
