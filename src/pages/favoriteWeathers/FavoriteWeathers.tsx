import { useEffect, useState } from 'react';
import { FavoriteCard } from '../../entities/favorite/components/FavoriteCard';
import type { Place } from '../../entities/detail/model/place';

export function FavoriteWeathers() {
  const [favorites, setFavorites] = useState<Place[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    const favorites = stored ? (JSON.parse(stored) as Place[]) : [];
    setFavorites(favorites);
  }, []);

  if (favorites.length === 0) {
    return <div>즐겨찾기한 장소가 없습니다.</div>;
  }

  return (
    <div className='grid gap-3'>
      {favorites.map((favorite) => (
        <FavoriteCard key={favorite.id} place={favorite} />
      ))}
    </div>
  );
}

export default FavoriteWeathers;
