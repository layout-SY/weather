import { useEffect, useState } from 'react';
import { FavoriteCard } from '../../entities/favorite/components/FavoriteCard';
import type { Place } from '../../entities/detail/model/place';

export function FavoriteWeathers() {
  const [favorites, setFavorites] = useState<Place[]>([]);

  useEffect(() => {
    const items = Object.keys(localStorage)
      .map((key) => localStorage.getItem(key))
      .filter((raw): raw is string => Boolean(raw))
      .map((raw) => {
        try {
          const parsed = JSON.parse(raw)
          return parsed.place as Place
        } catch {
          return null;
        }
      })
      .filter((favorite): favorite is Place => Boolean(favorite));
    setFavorites(items);
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
