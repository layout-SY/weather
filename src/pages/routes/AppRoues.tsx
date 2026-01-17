import { ROUTES } from './routingConstants';
import { MainPage } from '../main/MainPage';
import { NewWeather } from '../newWeather/NewWeather';
import { WeatherDetail } from '../weatherDetail/WeatherDetail';
import { FavoriteWeathers } from '../favoriteWeathers/FavoriteWeathers';
import { NotFoundPage } from '../notFoundPage/NotFoundPage';

export const AppRoutes = () => {
  const routeList = [
    {
      path: ROUTES.main,
      element: <MainPage />,
    },
    {
      path: ROUTES.newWeather,
      element: <NewWeather />,
    },

    {
      path: `${ROUTES.weatherDetail}/:weatherId`,
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

  return newRouteList;
};

export default AppRoutes;
