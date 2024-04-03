import React from 'react';
import { Offer } from '../types/offers';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/use-favorites';
import { FavoritesUpdate } from '../const';

type OfferCardProps = {
  offer: Offer;
  setActiveOffer?: (id: number | null) => void;
  additionalClass?: string;
  imageSize?: string;
  imageWidth?: number;
  imageHeight?: number;
  favoritesUpdate: FavoritesUpdate;
}

const OfferCard: React.FC<OfferCardProps> = ({ favoritesUpdate, offer, setActiveOffer, additionalClass, imageSize, imageWidth, imageHeight }) => {

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

  const cardClasses = `${additionalClass ? 'favorites__card' : 'cities__card'} place-card`;
  const imageClasses = `${imageSize ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`;
  const cardClassInfo = `${additionalClass ? `${additionalClass}-info` : 'place-card__info'}`;

  return (
    <article className={cardClasses} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={imageClasses}>
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
      <div className={cardClassInfo}>
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
