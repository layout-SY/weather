export interface KakaoGeoResponse {
  documents: Documents[];
  meta: Meta;
}

export interface Meta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface Documents {
  address_name: string;
  address_type: string;
  x: number;
  y: number;
  address: Address;
  road_address: RoadAddress;
}

export interface Address {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: number;
  y: number;
}

export interface RoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: number;
  y: number;
}
