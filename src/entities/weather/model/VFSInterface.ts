import { VFS_ERROR_CODE_META } from '../constants/VFSResponseConstants';

export type VFSErrorCode = keyof typeof VFS_ERROR_CODE_META;

// (선택) 공통 응답 타입(필요한 만큼만)
export interface VFSResponse<TItem> {
  response: {
    header: { resultCode: string; resultMsg: string };
    body?: {
      dataType: 'JSON' | 'XML';
      items?: { item: TItem[] };
      pageNo: number;
      numOfRows: number;
      totalCount: number;
    };
  };
}

export interface WeatherCommonRequestParams {
  numOfRows: number;
  pageNo: number;
  dataType: 'JSON' | 'XML';
  base_date: string;
  base_time: string;
  nx: number;
  ny: number;
}

export interface WeatherCommonResponseParams {
  category?: string;
  nx: number;
  ny: number;
  base_date: string;
  base_time: string;
}

/** 초단기실황조회(getUltraSrtNcst) 파라미터 */
export interface UltraSrtNcstResponseParams
  extends WeatherCommonResponseParams {
  obsrValue: string | number;
}

/** 단기예보조회(getVilageFcst) 파라미터 */
export interface VilageFcstResponseParams extends WeatherCommonResponseParams {
  fcstDate: number;
  fcstTime: number;
  fcstValue: string | number;
}

export interface UltraSrtFcstResponseParams
  extends WeatherCommonResponseParams {
  fcstDate: number;
  fcstTime: number;
  fcstValue: string | number;
}
