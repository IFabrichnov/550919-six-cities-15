import React, { useState } from 'react';
import { Offer } from '../types/offers';
import { Link } from 'react-router-dom';

type OfferCardProps = {
  offer: Offer;
  setActiveOffer: (id: string | null) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, setActiveOffer }) => {
  const { isPremium, previewImage, price, id, rating, type, name, isFavorite } = offer;
  const [isFavoriteCard, setIsFavoriteCard] = useState(isFavorite);

  const handleMouseOver = () => {
    setActiveOffer(id as string | null);
  };

  const handleMouseOut = () => {
    setActiveOffer(null);
  };

  return (
    <article className="cities__card place-card" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${id}`}>
          <img
            className="place-card__image"
            src={typeof previewImage === 'string' ? previewImage : ''}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">>€{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={() => setIsFavoriteCard(!isFavoriteCard)} className={`place-card__bookmark-button ${isFavoriteCard ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default OfferCard;
