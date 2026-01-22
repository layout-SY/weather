import { useLocation } from 'react-router-dom';
import type { Place } from '../../shared/model/place';
import { Detail } from '../../widgets/detail/components/Detail';

export function WeatherDetail() {
  const location = useLocation();
  const state = location.state as { place?: Place } | undefined;
  const place = state?.place;

  if (!place) {
    return <div>정보 없음</div>;
  }

  return <Detail place={place} />;
}

export default WeatherDetail;
