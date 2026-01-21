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

interface KakaoCoord2AddressResponse {
  documents?: Array<{
    address?: { address_name: string } | null;
    road_address?: { address_name: string } | null;
  }>;
}

export const getKakaoGeoAddress = async (
  params: KakaoGeoRequestParams,
): Promise<Documents[]> => {
  const { data } = await kakaoGeoAxios.get<KakaoGeoResponse>(
    '/search/address.json',
    {
      headers: {
        Authorization: `KakaoAK ${SERVICE_KEY}`,
      },
      params,
    },
  );
  return data.documents ?? [];
};

export const getKakaoAddressFromCoords = async (params: {
  x: number;
  y: number;
}): Promise<string | null> => {
  const { data } = await kakaoGeoAxios.get<KakaoCoord2AddressResponse>(
    '/geo/coord2address.json',
    {
      headers: {
        Authorization: `KakaoAK ${SERVICE_KEY}`,
      },
      params,
    },
  );

  const first = data.documents?.[0];
  return (
    first?.road_address?.address_name ?? first?.address?.address_name ?? null
  );
};
