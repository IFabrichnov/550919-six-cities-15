import React from 'react';
import { Offer } from '../types/offers';
import OfferCard from './offer-card';


type NearOfferCardProps = {
  offerCard: Offer;
}

function NearOfferCard({ offerCard }: NearOfferCardProps): JSX.Element {
  return (
    <OfferCard offer={offerCard} />
  );
}

export default NearOfferCard;
