import { useEffect, useState } from 'react';
import { useQueryWithKakaoGeoCoords } from '../../entities/address/hooks/useQueryWithKakaoGeo';
import { Detail } from '../../widgets/detail/components/Detail';

export function MainPage() {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('이 브라우저는 위치 정보를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const x = position.coords.longitude;
        const y = position.coords.latitude;
        setCoords({ x, y });
      },
      () => {
        setGeoError('위치 정보 권한이 필요합니다.');
      }
    );
  }, []);

  const {
    data: address,
    isLoading: isAddressLoading,
    error: addressError,
  } = useQueryWithKakaoGeoCoords({ x: coords?.x ?? 0, y: coords?.y ?? 0 });

  if (addressError) {
    return <div>주소 변환에 실패했습니다.</div>;
  }

  if (isAddressLoading) {
    return <div>위치 기반 주소를 불러오는 중...</div>;
  }

  return (
    <Detail
      place={{
        id: 1,
        address: address ?? '',
        lat: coords?.x ?? 0,
        lng: coords?.y ?? 0,
      }}
    />
  );
}
