import FavoriteCard from './favorite-card';
import { Offers } from '../types/offers';

type FavoriteCardListProps = {
  offerList: Offers;
}

function FavoriteCardList({ offerList }: FavoriteCardListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {offerList.map((offer) => {
        const keyValue = offer.id;
        return (
          <FavoriteCard key={keyValue} offerCard={offer} />
        );
      })}
    </ul>
  );
}

export default FavoriteCardList;
