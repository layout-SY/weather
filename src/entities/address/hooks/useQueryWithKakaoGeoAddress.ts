import { useQuery } from '@tanstack/react-query';
import { getKakaoGeoAddress } from '../api/fetchKakaoGeo';
import { KakaoGeoRequestParams } from '../model/KakaoGeoRequestInterface';

export function useQueryWithKakaoGeoAddress(params: KakaoGeoRequestParams) {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      'kakaoGeoAddress',
      params.query,
      params.analyze_type,
      params.page,
    ],
    queryFn: () => getKakaoGeoAddress(params),
    enabled: Boolean(params.query?.trim()),
  });

  return { data, isLoading, error };
}
