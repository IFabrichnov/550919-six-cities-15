import { Offers } from '../types/offers';
import NearOfferCard from './near-offer-card';

type NearOfferCardListProps = {
  offerList: Offers;
}

function NearOfferCardList({ offerList }: NearOfferCardListProps): JSX.Element {

  return (
    < >
      {offerList.map((offer) => {
        const keyValue = offer.id;
        return (
          <NearOfferCard key={keyValue} offerCard={offer} />
        );
      })}
    </>
  );
}

export default NearOfferCardList;
