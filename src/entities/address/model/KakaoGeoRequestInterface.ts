export interface KakaoGeoRequestParams {
  query: string;
  analyze_type: 'similar' | 'exact';
  page?: number;
  size?: number;
}
