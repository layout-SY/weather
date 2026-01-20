import { Outlet } from 'react-router-dom';
import { ROUTES } from './routingConstants';
import { MainPage } from '../main/MainPage';
import { WeatherDetail } from '../weatherDetail/WeatherDetail';
import { FavoriteWeathers } from '../favoriteWeathers/FavoriteWeathers';
import { NotFoundPage } from '../notFoundPage/NotFoundPage';
import { AddressModal } from '../../entities/address/components/AdrressModal';
import { AddressModalProvider } from '../../entities/address/context/AddressModalContext';

export const AppRoutes = () => {
  const routeList = [
    {
      path: ROUTES.main,
      element: <MainPage />,
    },
    {
      path: `${ROUTES.weatherDetail}`,
      element: <WeatherDetail />,
    },
    {
      path: ROUTES.favoriteWeathers,
      element: <FavoriteWeathers />,
    },
  ];

  const newRouteList = routeList.map((item) => {
    return {
      ...item,
      errorElement: <NotFoundPage />,
    };
  });

  return [
    {
      element: (
        <AddressModalProvider>
          <AddressModal />
          <Outlet />
        </AddressModalProvider>
      ),
      children: newRouteList,
    },
  ];
};

export default AppRoutes;
