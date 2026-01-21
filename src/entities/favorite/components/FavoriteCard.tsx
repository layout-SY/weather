import { Link } from 'react-router-dom';
import type { Place } from '../../detail/model/place';
import { useWeather } from '../../detail/hooks/useWeather';
import { ROUTES } from '../../../pages/routes/routingConstants';

export function FavoriteCard({ place }: { place: Place }) {
  const title = place.alias?.trim() || place.address || place.id;
  const { todayMinTemp, todayMaxTemp } = useWeather({
    x: place.lat,
    y: place.lng,
  });

  return (
    <Link
      to={ROUTES.weatherDetail}
      state={{ place }}
      className='block rounded-md border border-gray-200 p-3 text-sm hover:border-blue-300 hover:bg-blue-50'
    >
      <div className='text-base font-semibold'>{title}</div>
      <div className='text-gray-600'>{place.address ?? '-'}</div>
      <div className='text-gray-600'>
        최저: {todayMinTemp ?? '-'} °C / 최고: {todayMaxTemp ?? '-'} °C
      </div>
    </Link>
  );
}
