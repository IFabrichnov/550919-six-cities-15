import React from 'react';
import { Offer } from '../types/offers';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/use-favorites';
import { FavoritesUpdate } from '../const';

type OfferCardProps = {
  offer: Offer;
  setActiveOffer?: (id: number | null) => void;
  imageWidth?: number;
  imageHeight?: number;
  favoritesUpdate: FavoritesUpdate;
  placeType: 'cities' | 'near-places';
}

const OfferCard: React.FC<OfferCardProps> = ({ favoritesUpdate, offer, setActiveOffer, imageWidth, imageHeight, placeType }) => {

  const handleMouseOver = () => {
    if (setActiveOffer) {
      setActiveOffer(offer.id as number | null);
    }
  };

  const handleMouseOut = () => {
    if (setActiveOffer) {
      setActiveOffer(null);
    }
  };

  const currentStatus = offer.isFavorite ? 0 : 1;
  const onChangeFavorites = useFavorites(
    String(offer.id),
    currentStatus,
    favoritesUpdate
  );

  return (
    <article className={`${placeType}__card place-card`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${placeType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth || 260}
            height={imageHeight || 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            onClick={onChangeFavorites}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={`offer/${offer.id}`}>{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default OfferCard;
