import type { Place } from '../../../shared/model/place';
import FavoriteWeathers from '../../favoriteWeathers/FavoriteWeathers';

interface FavoriteSidebarProps {
  isDesktop: boolean;
  place: Place;
}

export const FavoriteSidebar = ({ isDesktop, place }: FavoriteSidebarProps) => {
  if (!isDesktop) {
    return null;
  }

  return <FavoriteWeathers variant='sidebar' selectedPlace={place} />;
};
