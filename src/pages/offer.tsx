import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReviewsList from '../components/review-card-list';
import Header from '../components/header';
import Map from '../components/map';
import NearOfferCardList from '../components/near-offer-card-list';
import { useAppSelector } from '../hooks';
import Spinner from '../components/spinner/spinner';
import { store } from '../store';
import { fetchOfferAction, fetchReviewsAction, fetchNearOffersAction } from '../store/api-action';
import { AppRoutes } from '../const';
import { getCity } from '../store/offers-process/offers-process.selectors';
import { getOffer, getOfferIsLoading, getOfferIsNotFound } from '../store/offer-process/offer-process.selectors';
import { getReviews } from '../store/reviews-process/reviews-process.selectors';
import { getNearOffers, getNearOffersIsLoading } from '../store/near-offers-process/near-offers-process.selectors';
import { useFavorites } from '../hooks/use-favorites';
import { FavoritesUpdate } from '../const';

const MIN_NEAR_OFFERS_COUNT = 0;
const MAX_NEAR_OFFERS_COUNT = 3;

const Offer: React.FC = () => {
  const params = useParams();
  const offerId = params.id;
  const cityMapActive = useAppSelector(getCity);

  const selectedOffer = useAppSelector(getOffer);
  const offerIsLoading = useAppSelector(getOfferIsLoading);
  const offerIsNotFound = useAppSelector(getOfferIsNotFound);
  const reviewsActive = useAppSelector(getReviews);
  const nearOffers = useAppSelector(getNearOffers);
  const nearOffersIsLoading = useAppSelector(getNearOffersIsLoading);
  const activeNearOffers = nearOffers.slice(MIN_NEAR_OFFERS_COUNT, Math.min(MAX_NEAR_OFFERS_COUNT, nearOffers.length));

  const nearOfferPlusSelectedOffer = [...activeNearOffers];
  if (selectedOffer) {
    nearOfferPlusSelectedOffer.push(selectedOffer);
  }

  useEffect(() => {
    store.dispatch(fetchOfferAction(offerId));
    store.dispatch(fetchReviewsAction(offerId));
    store.dispatch(fetchNearOffersAction(offerId));
  }, [offerId]);

  const currentStatus = selectedOffer && selectedOffer.isFavorite ? 0 : 1;
  const onChangeFavorites = useFavorites(
    String(offerId),
    currentStatus,
    FavoritesUpdate.Offer
  );

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        {offerIsLoading && <Spinner />}
        {offerIsNotFound && <Navigate to={AppRoutes.NotFound} />}
        {selectedOffer && !offerIsNotFound && !offerIsLoading && (
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {selectedOffer.images
                  .map((url, id) => {
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
                {selectedOffer.isPremium ?
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                  : ''}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {selectedOffer.title}
                  </h1>
                  <button
                    onClick={onChangeFavorites}
                    className={`offer__bookmark-button button ${selectedOffer?.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                    type="button"
                  >
                    <svg className="offer__bookmark-icon" width={31} height={33}>
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
                  <span className="offer__rating-value rating__value">{selectedOffer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{selectedOffer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {selectedOffer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {selectedOffer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{selectedOffer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                {selectedOffer.goods && (
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">Whats inside</h2>
                    <ul className="offer__inside-list">
                      {selectedOffer.goods.map((good) => {
                        const keyValue = good;
                        return (<li key={keyValue} className="offer__inside-item">{good}</li>);
                      })}
                    </ul>
                  </div>
                )}
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    {selectedOffer.host?.avatarUrl && (
                      <div className={`offer__avatar-wrapper ${selectedOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                        <img
                          className="offer__avatar user__avatar"
                          src={selectedOffer.host.avatarUrl}
                          width={74}
                          height={74}
                          alt="Host avatar"
                        />
                      </div>
                    )}
                    {selectedOffer.host?.hostName && (
                      <span className="offer__user-name">{selectedOffer.host.hostName}</span>
                    )}
                    {selectedOffer.host?.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      A quiet cozy and picturesque that hides behind a a river by the
                      unique lightness of Amsterdam. The building is green and from
                      18th century.
                    </p>
                    <p className="offer__text">
                      An independent House, strategically located between Rembrand
                      Square and National Opera, but where the bustle of the city
                      comes to rest in this alley flowery and colorful.
                    </p>
                  </div>
                </div>
                {reviewsActive && (<ReviewsList reviewList={reviewsActive} offerId={offerId} />)}
              </div>
            </div>
            <Map mapType={'offer'} offers={nearOfferPlusSelectedOffer} activeOffer={selectedOffer.id} city={cityMapActive} />
          </section>
        )}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {!nearOffersIsLoading && (
                <NearOfferCardList offerList={activeNearOffers} />
              )}
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default Offer;
