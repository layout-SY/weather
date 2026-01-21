import { useQuery } from '@tanstack/react-query';
import {
  getKakaoAddressFromCoords,
  getKakaoGeoAddress,
} from '../api/fetchKakaoGeo';
import { KakaoGeoRequestParams } from '../model/KakaoGeoRequestInterface';

export const useQueryWithKakaoGeoAddress = (params: KakaoGeoRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      'kakaoCoordsWithAddress',
      params.query,
      params.analyze_type,
      params.page,
    ],
    queryFn: () => getKakaoGeoAddress(params),
    enabled: Boolean(params.query?.trim()),
  });

  return { data, isLoading, error };
};

export const useQueryWithKakaoGeoCoords = (
  coords: { x: number; y: number } | null,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['kakaoAddressWithCoords', coords?.x, coords?.y],
    queryFn: () => getKakaoAddressFromCoords({ x: coords!.x, y: coords!.y }),
    enabled: Boolean(coords),
  });

  return { data, isLoading, error };
};
