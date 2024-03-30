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
import { Offers } from '../types/offers';
import { Comments } from '../types/comments';
import Spinner from './spinner/spinner';
import HistoryRouter from '../components/history-route';
import browserHistory from '../browser-history';

type AppScreenProps = {
  offers: Offers;
  comments: Comments;
  citiesList: string[];
};

const App: React.FC<AppScreenProps> = ({ offers, comments, citiesList }) => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.offersIsLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <Spinner />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoutes.Main} element={<MainPage offers={offers} citiesList={citiesList} />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Offer} element={<Offer offers={offers} comments={comments} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
};


export default App;
