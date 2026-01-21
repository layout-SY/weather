import { Place } from '../../detail/model/place';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'favorites';

const matchesPlace = (item: Place, place: Place) =>
  item.address?.trim() === place.address?.trim() &&
  item.lat === place.lat &&
  item.lng === place.lng;

const loadFavorites = (): Place[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? (JSON.parse(stored) as Place[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveFavorites = (list: Place[]) => {
  if (list.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export function useFavoriteAddress(place: Place) {
  const [alias, setAlias] = useState(place.alias ?? '');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditingAlias, setIsEditingAlias] = useState(false);

  useEffect(() => {
    setAlias(place.alias ?? '');
    setIsEditingAlias(false);
    const list = loadFavorites();
    const current = list.find((item) => matchesPlace(item, place));
    if (current) {
      setIsFavorite(true);
      setAlias(current.alias ?? '');
    } else {
      setIsFavorite(false);
    }
  }, [place]);

  const openAliasEditor = () => setIsEditingAlias(true);
  const closeAliasEditor = () => setIsEditingAlias(false);

  const saveFavorite = () => {
    const list = loadFavorites();
    const alreadySaved = list.some((item) => matchesPlace(item, place));
    if (!alreadySaved && list.length >= 6) {
      return;
    }
    const item: Place = {
      ...place,
      id: list.length + 1,
      alias: alias.trim(),
    };
    const next = list.filter((p) => !matchesPlace(p, place)).concat(item);
    saveFavorites(next);
    setIsFavorite(true);
    setIsEditingAlias(false);
  };

  const removeFavorite = () => {
    const list = loadFavorites();
    const next = list.filter((p) => !matchesPlace(p, place));
    saveFavorites(next);
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
