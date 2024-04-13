import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter, getImageSize, getRating } from '@utils/common';
import { AppRoute } from '@const';
import { Offer } from '@type/offer';
import { Size } from '@type/size';
import { memo } from 'react';
import FavoriteButton from '@components/favorite-button/favorite-button';

type TCardProps = {
  offer: Offer;
  block: string;
  size?: Size;
  onMouseOver?: (offer: Offer | null) => void;
}

function Card({ offer, block, size = 'large', onMouseOver }: TCardProps): JSX.Element {
  const handleOfferHover = () => {
    if(onMouseOver) {
      onMouseOver(offer);
    }
  };

  const handleOfferLeave = () => {
    if(onMouseOver) {
      onMouseOver(null);
    }
  };

  return (
    <article className={`${block}__card place-card`} onMouseOver={handleOfferHover} onMouseLeave={handleOfferLeave} data-testid={`${block}-card`}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} {...getImageSize(size)} alt="Place image" />
        </Link>
      </div>
      <div className={classNames({'favorites__card-info': block === 'favorites'}, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={offer.isFavorite} offerId={offer.id} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(offer.rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

const MemoizedCard = memo(Card);
export default MemoizedCard;
