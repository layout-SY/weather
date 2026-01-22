import { Link } from 'react-router-dom';
import type { Place } from '../../detail/model/place';
import { useWeather } from '../../detail/hooks/useWeather';
import { ROUTES } from '../../../pages/routes/routingConstants';
import { formatAddress } from '../../../shared/utils/formatAddress';

export function FavoriteCard({
  place,
  isSelected = false,
}: {
  place: Place;
  isSelected?: boolean;
}) {
  const title = place.alias?.trim() || place.address || place.id;
  const displayAddress = formatAddress(place.address);
  const { currentTemp, todayMinTemp, todayMaxTemp } = useWeather({
    x: place.lat,
    y: place.lng,
  });

  return (
    <Link
      to={ROUTES.weatherDetail}
      state={{ place }}
      className={`block min-h-[120px] rounded-2xl bg-white p-4 text-black transition-colors ${
        isSelected ? 'border-2 border-blue-500' : 'border border-transparent'
      }`}
    >
      <div className='flex flex-col gap-11'>
        <div className='flex items-start justify-between gap-4'>
          <div className='text-xl font-semibold leading-snug line-clamp-2 wrap-break-word'>
            {title}
          </div>
          <div className='text-3xl font-semibold leading-none'>
            {currentTemp ?? '-'}°
          </div>
        </div>
        <div className='mt-auto flex items-end justify-between gap-3 text-[0.65rem]'>
          <div className='min-w-0 truncate'>{displayAddress || '-'}</div>
          <div className='whitespace-nowrap'>
            최고:{todayMaxTemp ?? '-'}° 최저:{todayMinTemp ?? '-'}°
          </div>
        </div>
      </div>
    </Link>
  );
}
