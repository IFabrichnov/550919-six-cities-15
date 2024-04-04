import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {useAppSelector} from '../hooks/index';
import MainPage from '../pages/main';
import LoginPage from '../pages/login';
import Favorites from '../pages/favorites';
import Offer from '../pages/offer';
import NotFoundPage from '../pages/not-found-page';
import PrivateRoute from './private-route';
import { AppRoutes, AuthorizationStatus } from '../const';
import Spinner from './spinner/spinner';
import { citiesList } from '../const';
import HistoryRouter from '../components/history-route';
import browserHistory from '../browser-history';
import { getAuthorizationStatus } from '../store/user-process/user-process.selectors';
import { getOffersIsLoading } from '../store/offers-process/offers-process.selectors';

const App: React.FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersIsLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <Spinner />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoutes.Main} element={<MainPage citiesList={citiesList} />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Offer} element={<Offer />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
};


export default App;
