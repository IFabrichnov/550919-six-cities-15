import React, { useState } from 'react';
import { Offer } from '../types/offers';
import { Link } from 'react-router-dom';

type OfferCardProps = {
  offer: Offer;
  setActiveOffer?: (id: number | null) => void;
  additionalClass?: string;
  imageSize?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, setActiveOffer, additionalClass, imageSize, imageWidth, imageHeight }) => {
  const { isPremium, previewImage, price, id, rating, type, title, isFavorite } = offer;
  const [isFavoriteCard, setFavoriteCard] = useState(isFavorite);

  const handleMouseOver = () => {
    if (setActiveOffer) {
      setActiveOffer(id as number | null);
    }
  };

  const handleMouseOut = () => {
    if (setActiveOffer) {
      setActiveOffer(null);
    }
  };

  const handleClick = () => {
    setFavoriteCard(!isFavoriteCard);
  };

  const cardClasses = `${additionalClass ? 'favorites__card' : 'cities__card'} place-card`;
  const imageClasses = `${imageSize ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`;
  const cardClassInfo = `${additionalClass ? `${additionalClass}-info` : 'place-card__info'}`;

  return (
    <article className={cardClasses} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={imageClasses}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageWidth || 260}
            height={imageHeight || 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cardClassInfo}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            onClick={handleClick}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={`offer/${id}`}>{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default OfferCard;
