import { useLocation } from 'react-router-dom';
import { Detail } from '../../widgets/detail/Detail';
import type { Place } from '../../shared/model/place';

export function WeatherDetail() {
  const location = useLocation();
  const state = location.state as { place?: Place } | undefined;
  const place = state?.place;

  // 변경 예정
  if (!place) {
    return <div>정보 없음</div>;
  }

  return <Detail place={place} />;
}

export default WeatherDetail;
