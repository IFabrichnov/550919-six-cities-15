import { Offer } from '@type/offer';
import { getFavoriteCitiesFromOffers } from '@utils/common';
import FavoriteItem from '../favorite-item/favorite-item';

type TFavoriteListProps = {
  offers: Offer[];
}

function FavoriteList({ offers }: TFavoriteListProps): JSX.Element {
  const cities = getFavoriteCitiesFromOffers({offers});
  return (
    <ul className="favorites__list" data-testid='favorite-list'>
      {
        cities.map((city) => (
          <FavoriteItem key={city} offers={offers} city={city}/>
        ))
      }
    </ul>
  );
}

export default FavoriteList;
