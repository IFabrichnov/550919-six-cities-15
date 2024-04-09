import React from 'react';
import OfferCard from './offer-card';
import {Offers} from '../types/offers';
import { FavoritesUpdate } from '../const';

type OfferCardListProps = {
  offers: Offers;
  setActiveOffer: (id: number | null) => void;
}

const OfferCardList: React.FC<OfferCardListProps> = ({ offers, setActiveOffer }) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <OfferCard placeType={'cities'} key={offer.id} favoritesUpdate={FavoritesUpdate.Offers} offer={offer} setActiveOffer={setActiveOffer} />
    ))}
  </div>
);
export default OfferCardList;
