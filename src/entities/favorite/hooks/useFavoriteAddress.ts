import { Place } from '../../detail/model/place';
import { useEffect, useMemo, useState } from 'react';

export function useFavoriteAddress(place: Place) {
  const [alias, setAlias] = useState(place.alias ?? '');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditingAlias, setIsEditingAlias] = useState(false);

  const storageKey = useMemo(
    () =>
      `${place.address?.trim() || ''}:${place.lat}:${place.lng}`,
    [place.address, place.lat, place.lng],
  );

  useEffect(() => {
    setAlias(place.alias ?? '');
    setIsEditingAlias(false);
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      setIsFavorite(false);
      return;
    }
    try {
      const parsed = JSON.parse(stored) as Place | null;
      setIsFavorite(true);
      setAlias(parsed?.alias ?? '');
    } catch {
      setIsFavorite(false);
    }
  }, [storageKey]);

  const openAliasEditor = () => setIsEditingAlias(true);
  const closeAliasEditor = () => setIsEditingAlias(false);

  const saveFavorite = () => {
    const payload: Place = {
      ...place,
      alias: alias.trim(),
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
    setIsFavorite(true);
    setIsEditingAlias(false);
  };

  const removeFavorite = () => {
    localStorage.removeItem(storageKey);
    setIsFavorite(false);
    setIsEditingAlias(false);
    setAlias('');
  };

  return {
    alias,
    isFavorite,
    setAlias,
    isEditingAlias,
    openAliasEditor,
    closeAliasEditor,
    saveFavorite,
    removeFavorite,
  };
}
