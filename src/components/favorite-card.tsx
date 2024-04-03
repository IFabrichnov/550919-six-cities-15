import { Link } from 'react-router-dom';
import { Offer } from '../types/offers';
import { useFavorites } from '../hooks/use-favorites';
import { FavoritesUpdate } from '../const';

type FavoriteCardProps = {
  offerCard: Offer;
}

function FavoriteCard({ offerCard }: FavoriteCardProps): JSX.Element {
  const handleStars = (width: number) => `${Math.round(width) * 20}%`;
  const currentStatus = offerCard && offerCard.isFavorite ? 0 : 1;
  const onChangeFavorites = useFavorites(
    String(offerCard.id),
    currentStatus,
    FavoritesUpdate.Favorites
  );

  return (
    <li className="favorites__locations-items" key={offerCard.id}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to='/'>
            <span>{offerCard.city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <article className="favorites__card place-card">
          {offerCard.isPremium === true && <div className="place-card__mark"><span>Premium</span></div>}
          <div className="favorites__image-wrapper place-card__image-wrapper">
            <Link to={`/offer/${offerCard.id}`}>
              <img
                className="place-card__image"
                src={offerCard.previewImage}
                width="150"
                height="110"
                alt="Place image"
              />
            </Link>
          </div>
          <div className="favorites__card-info place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;{offerCard.price}</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button
                onClick={onChangeFavorites}
                className={`place-card__bookmark-button button ${offerCard.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
                type="button"
              >
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">In bookmarks</span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: `${handleStars(offerCard.rating)}` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <Link to={`/offer/${offerCard.id}`}>{offerCard.title}</Link>
            </h2>
            <p className="place-card__type">{offerCard.type}</p>
          </div>
        </article>
      </div>
    </li>
  );
}


export default FavoriteCard;
