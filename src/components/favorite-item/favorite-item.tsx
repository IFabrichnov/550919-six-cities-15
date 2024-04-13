import { Offer } from '@type/offer';
import MemoizedCard from '../card/card';

type TFavoriteItemProps = {
  offers: Offer[];
  city: string;
}

function FavoriteItem({ offers, city }: TFavoriteItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items" data-testid='favorite-item'>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers
            .filter((offer) => offer.city.name === city)
            .map((offer) => <MemoizedCard key={offer.id} offer={offer} block='favorites' size='small'/>)
        }
      </div>
    </li>
  );
}

export default FavoriteItem;
