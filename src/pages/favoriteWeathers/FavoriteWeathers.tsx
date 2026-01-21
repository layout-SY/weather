import { useEffect, useState } from 'react';
import { FavoriteCard } from '../../entities/favorite/components/FavoriteCard';
import type { Place } from '../../entities/detail/model/place';

type FavoriteWeathersProps = {
  variant?: 'route' | 'sidebar';
};

export function FavoriteWeathers({ variant = 'route' }: FavoriteWeathersProps) {
  const [favorites, setFavorites] = useState<Place[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    const favorites = stored ? (JSON.parse(stored) as Place[]) : [];
    setFavorites(favorites);
  }, []);

  const wrapperClassName =
    variant === 'sidebar'
      ? 'hidden h-full rounded-2xl bg-black/30 p-2 lg:block lg:h-[calc(100vh-135px)] lg:w-80 lg:shrink-0'
      : 'mx-auto w-[calc(100%-30px)] rounded-2xl bg-black/30 p-2';

  return (
    <div className={wrapperClassName}>
      {favorites.length === 0 ? (
        <div className="py-10 text-center text-white-500">
          즐겨찾기한 장소가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {favorites.map((favorite) => (
            <FavoriteCard key={favorite.id} place={favorite} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteWeathers;