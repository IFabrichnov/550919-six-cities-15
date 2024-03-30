import React, { useState } from 'react';
import OfferCardList from '../components/offer-card-list';
import Header from '../components/header';
import Map from '../components/map';
import { useAppSelector } from '../hooks/index';
import LocationsList from '../components/location-list';
import {Offers} from '../types/offers';
import {useParams} from 'react-router-dom';
import Sort from '../components/sort';

interface MainPageProps {
  offers: Offers;
  citiesList: string[];
}

const MainPage: React.FC<MainPageProps> = ({ citiesList,offers }) => {
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const params = useParams();
  const cardId = parseInt(params.id || '0', 10).toString();
  const selectedCard = offers.filter((offer) => offer.id === parseInt(cardId, 10))[0];
  const cityActive = useAppSelector((state) => state.cityActive);
  const offersActive = useAppSelector((state) => state.offers);
  const filteredOffersByCity = offersActive.filter((offer) => offer.city.name === cityActive);
  const placesCount = filteredOffersByCity.length;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList offers={offers} cities={citiesList} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {cityActive}</b>
              <Sort />
              <OfferCardList offers={filteredOffersByCity} setActiveOffer={setActiveOffer} />
            </section>
            <div className="cities__right-section">
              <Map mapType={'offer'} offers={offersActive} activeOffer={activeOffer} city={selectedCard} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
