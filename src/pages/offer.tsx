import React from 'react';
import { useParams } from 'react-router-dom';
import CommentCard from '../components/comment-card';
import { Comments } from '../types/comments';
import Header from '../components/header';
import Map from '../components/map';
import {Offers} from '../types/offers';
import NearOfferCardList from '../components/near-offer-card-list';
import NotFoundPage from './not-found-page';
import {sortOffers} from '../utils';
import {useAppSelector} from '../hooks';

type OfferProps = {
  offers: Offers;
  comments: Comments;
};

const Offer: React.FC<OfferProps> = ({ offers, comments }) => {
  const { id } = useParams();
  const cityMapActive = useAppSelector((state) => state.city);
  const selectedCard = offers.filter((offer) => offer.id === id)[0];
  const { title, type, images, isPremium, rating, bedrooms, maxAdults, price, isFavorite, host, goods, description } = selectedCard;
  const { hostName, isPro, avatarUrl } = host;

  const foundOffer = useAppSelector((state)=>state.offers).find((offer): boolean => offer.id.toString() === id);
  if (!foundOffer) {
    return (<NotFoundPage />);
  }

  const offerPage = { ...selectedCard, ...foundOffer };
  const nearOffers = sortOffers(offerPage);
  const nearOfferPlusSelectedCard = [offerPage, ...nearOffers];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((url, id) => {
                const keyValue = `${id}-${url}`;
                return (
                  <div key={keyValue} className="offer__image-wrapper">
                    <img className="offer__image" src={url} alt="Photo studio" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
                : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className={`offer__bookmark-icon ${isFavorite ? 'offer__bookmark-button--active' : ''}`} width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">Whats inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => {
                    const keyValue = good;
                    return (<li key={keyValue} className="offer__inside-item">{good}</li>);
                  })}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{hostName}</span>
                  <span className="offer__user-status">{isPro ? 'Pro' : ''}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <CommentCard comments={comments}/>
              </section>
            </div>
          </div>
          <Map mapType={'main'} offers={nearOfferPlusSelectedCard} activeOffer={offerPage.id} city={cityMapActive}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <NearOfferCardList offerList={nearOffers} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
export default Offer;
