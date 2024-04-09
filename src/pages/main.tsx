import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/header';
import Map from '../components/map';
import { useAppSelector } from '../hooks/index';
import LocationsList from '../components/location-list';
import MainPageEmpty from './main-empty';
import Sort from '../components/sort';
import Spinner from '../components/spinner/spinner';
import { AppRoutes } from '../const';
import { getCityActive, getCity, getOffers, getOffersIsLoading, getOffersIsNotFound } from '../store/offers-process/offers-process.selectors';
import OfferCardList from '../components/offer-card-list';

const MainPage: React.FC = () => {
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const cityActive = useAppSelector(getCityActive);
  const offersActive = useAppSelector(getOffers);
  const cityMapActive = useAppSelector(getCity);
  const placesCount = offersActive.length;
  const offersIsLoading = useAppSelector(getOffersIsLoading);
  const offersIsNotFound = useAppSelector(getOffersIsNotFound);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList cityActive={cityActive} />
        {offersIsLoading && <Spinner />}
        {offersIsNotFound && <Navigate to={AppRoutes.NotFound} />}
        {!offersIsLoading && (
          <div className="cities">
            {placesCount ? (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{placesCount} places to stay in {cityActive}</b>
                  <Sort />
                  <div className="cities__places-list places__list tabs__content">
                    <OfferCardList offers={offersActive} setActiveOffer={setActiveOffer} />
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map mapType={'cities'} offers={offersActive} activeOffer={activeOffer} city={cityMapActive} />
                </div>
              </div>
            ) : (
              <MainPageEmpty cityActive={cityActive} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
