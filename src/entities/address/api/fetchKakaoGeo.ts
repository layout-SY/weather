// src/api/vfsShortForecast.ts
import { AxiosInstance } from '../../../shared/lib/axios';
import { KakaoGeoRequestParams } from '../model/KakaoGeoRequestInterface';
import {
  Documents,
  KakaoGeoResponse,
} from '../model/KakaoGeoResponseInterface';

const KAKAO_GEO_BASE_URL = 'https://dapi.kakao.com/v2/local';

const SERVICE_KEY = import.meta.env.VITE_KAKAO_GEO_API_KEY as string;

if (!SERVICE_KEY) {
  throw new Error('VITE_KAKAO_GEO_SERVICE_KEY가 설정되지 않았습니다.');
}

export const kakaoGeoAxios = AxiosInstance(KAKAO_GEO_BASE_URL, {
  timeout: 15_000,
});

export async function getKakaoGeoAddress(
  params: KakaoGeoRequestParams
): Promise<Documents[]> {
  const { data } = await kakaoGeoAxios.get<KakaoGeoResponse>(
    '/search/address.json',
    {
      headers: {
        Authorization: `KakaoAK ${SERVICE_KEY}`,
      },
      params,
    }
  );
  return data.documents ?? [];
}
