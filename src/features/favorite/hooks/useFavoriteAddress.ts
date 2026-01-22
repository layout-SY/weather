import type { Place } from '../../../shared/model/place';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'favorites';

const matchesPlace = (item: Place, place: Place) =>
  item.address?.trim() === place.address?.trim();

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

const notifyFavoritesChanged = () => {
  window.dispatchEvent(new CustomEvent('favorites:changed'));
};

const getNextAutoAlias = (list: Place[]) => {
  const usedNumbers = new Set<number>();
  list.forEach((item) => {
    const match = String(item.alias ?? '')
      .trim()
      .match(/^새 주소(\d+)$/);
    if (match?.[1]) {
      usedNumbers.add(Number(match[1]));
    }
  });
  let next = 1;
  while (usedNumbers.has(next)) {
    next += 1;
  }
  return `새 주소${next}`;
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
    const normalizedAlias = alias.trim().slice(0, 6);
    const finalAlias =
      normalizedAlias.length > 0 ? normalizedAlias : getNextAutoAlias(list);
    const item: Place = {
      ...place,
      id: list.length + 1,
      alias: finalAlias,
    };
    const next = list.filter((p) => !matchesPlace(p, place)).concat(item);
    saveFavorites(next);
    notifyFavoritesChanged();
    setIsFavorite(true);
    setIsEditingAlias(false);
    setAlias(finalAlias);
  };

  const removeFavorite = () => {
    const list = loadFavorites();
    const next = list.filter((p) => !matchesPlace(p, place));
    saveFavorites(next);
    notifyFavoritesChanged();
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
