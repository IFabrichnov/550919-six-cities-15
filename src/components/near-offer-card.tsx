import { Offer } from '../types/offers';
import OfferCard from './offer-card';
import { FavoritesUpdate } from '../const';


type NearOfferCardProps = {
  offerCard: Offer;
}

function NearOfferCard({ offerCard }: NearOfferCardProps): JSX.Element {
  return (
    <OfferCard offer={offerCard} favoritesUpdate={FavoritesUpdate.NearOffers} />
  );
}

export default NearOfferCard;
