import React, { useState } from 'react';
import OfferCardList from '../components/offer-card-list';
import Header from '../components/header';
import Map from '../components/map';
import { useAppSelector } from '../hooks/index';
import LocationsList from '../components/location-list';
import Sort from '../components/sort';

interface MainPageProps {
  citiesList: string[];
}

const MainPage: React.FC<MainPageProps> = ({ citiesList }) => {
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const cityActive = useAppSelector((state) => state.cityActive);
  const offersActive = useAppSelector((state) => state.offers);
  const cityMapActive = useAppSelector((state) => state.city);
  const placesCount = offersActive.length;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList cities={citiesList} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {cityActive}</b>
              <Sort />
              <OfferCardList offers={offersActive} setActiveOffer={setActiveOffer} />
            </section>
            <div className="cities__right-section">
              <Map mapType={'offer'} offers={offersActive} activeOffer={activeOffer} city={cityMapActive} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
