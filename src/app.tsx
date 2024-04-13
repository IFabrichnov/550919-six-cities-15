import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute } from '@const';
import { useAppDispatch } from './hooks';
import { fetchOffersAction } from '@store/thunks/offers';
import { checkAuthAction } from '@store/thunks/auth';
import MainPage from '@pages/main-page/main-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import LoginPage from '@pages/login-page/login-page';
import FavoritesPage from '@pages/favorites-page/favorites-page';
import OfferPage from '@pages/offer-page/offer-page';
import ProtectedRoute from '@components/protected-route/protected-route';
import { getToken } from '@services/token';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(checkAuthAction());
    }
    dispatch(fetchOffersAction());
  }, [token, dispatch]);

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<MainPage />}
      />
      <Route
        path={AppRoute.Login}
        element={<ProtectedRoute onlyUnAuth><LoginPage/></ProtectedRoute>}
      />
      <Route
        path={AppRoute.Favorites}
        element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>}
      />
      <Route
        path={`${AppRoute.Offer}/:offerId`}
        element={<OfferPage />}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
