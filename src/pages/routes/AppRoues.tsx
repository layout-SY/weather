import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ROUTES } from './routingConstants';
import { AddressModalProvider } from '../../entities/address/context/AddressModalContext';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';

const MainPage = lazy(() =>
  import('../main/MainPage').then((module) => ({ default: module.MainPage }))
);
const WeatherDetail = lazy(() =>
  import('../weatherDetail/WeatherDetail').then((module) => ({
    default: module.WeatherDetail,
  }))
);
const FavoriteWeathers = lazy(() =>
  import('../favoriteWeathers/FavoriteWeathers').then((module) => ({
    default: module.FavoriteWeathers,
  }))
);
const NotFoundPage = lazy(() =>
  import('../notFoundPage/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  }))
);
const AddressModal = lazy(() =>
  import('../../entities/address/components/AdrressModal').then((module) => ({
    default: module.AddressModal,
  }))
);

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
          <Suspense fallback={<LoadingSpinner />}>
            <AddressModal />
          </Suspense>
          <div className="min-h-screen bg-white p-6">
            <div className="mx-auto h-[calc(100vh-48px)] w-full max-w-6xl overflow-hidden rounded-2xl">
              <Outlet />
            </div>
          </div>
        </AddressModalProvider>
      ),
      children: newRouteList,
    },
  ];
};

export default AppRoutes;
