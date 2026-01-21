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
          return JSON.parse(raw) as Place;
        } catch {
          return null;
        }
      })
      .filter((item): item is Place => Boolean(item));
    setFavorites(items);
  }, []);

  if (favorites.length === 0) {
    return <div>즐겨찾기한 장소가 없습니다.</div>;
  }

  return (
    <div className='grid gap-3'>
      {favorites.map((item) => (
        <FavoriteCard key={item.id} place={item} />
      ))}
    </div>
  );
}

export default FavoriteWeathers;
