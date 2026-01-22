import { useEffect, useState } from 'react';
import { FavoriteCard } from '../../features/favorite/components/FavoriteCard';
import type { Place } from '../../shared/model/place';

interface FavoriteWeathersProps {
  variant?: 'route' | 'sidebar';
  selectedPlace?: Place;
}

export function FavoriteWeathers({
  variant = 'route',
  selectedPlace,
}: FavoriteWeathersProps) {
  const [favorites, setFavorites] = useState<Place[]>([]);

  const loadFavorites = () => {
    const stored = localStorage.getItem('favorites');
    const favorites = stored ? (JSON.parse(stored) as Place[]) : [];
    setFavorites(favorites);
  };

  useEffect(() => {
    loadFavorites();
    const handleFavoritesChanged = () => loadFavorites();
    window.addEventListener('favorites:changed', handleFavoritesChanged);
    window.addEventListener('storage', handleFavoritesChanged);
    return () => {
      window.removeEventListener('favorites:changed', handleFavoritesChanged);
      window.removeEventListener('storage', handleFavoritesChanged);
    };
  }, []);

  const isSamePlace = (target: Place, compare?: Place) => {
    if (!compare) return false;
    return (
      target.address?.trim() === compare.address?.trim() &&
      target.lat === compare.lat &&
      target.lng === compare.lng
    );
  };

  const wrapperClassName =
    variant === 'sidebar'
      ? 'hidden h-full min-h-0 flex-col rounded-2xl bg-black/30 p-2 lg:flex lg:h-[calc(100vh-135px)] lg:w-80 lg:shrink-0'
      : 'mx-auto flex min-h-0 w-[calc(100%-30px)] flex-col rounded-2xl bg-black/30 p-2';

  return (
    <div className={wrapperClassName}>
      {favorites.length === 0 ? (
        <div className='py-10 text-center text-white-500'>
          즐겨찾기한 장소가 없습니다.
        </div>
      ) : (
        <div className='flex min-h-0 flex-col gap-3 overflow-y-auto pr-1'>
          {favorites.map((favorite) => (
            <FavoriteCard
              key={favorite.id}
              place={favorite}
              isSelected={isSamePlace(favorite, selectedPlace)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteWeathers;
