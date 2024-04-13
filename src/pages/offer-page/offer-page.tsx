import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect } from 'react';
import { capitalizeFirstLetter, getRating, isAuth, pluralize } from '@utils/common';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { IMAGES_COUNT, NEAR_OFFERS_COUNT, RequestStatus } from '@const';
import { authSelectors } from '@store/slices/auth';
import { fetchCommentsAction } from '@store/thunks/comments';
import { offerSelectors } from '@store/slices/offer';
import { fetchNearByOffersAction, fetchOfferByIdAction } from '@store/thunks/offers';
import { commentsSelectors } from '@store/slices/comments';
import Container from '@components/container/container';
import OfferCommentForm from '@components/offer-comment-form/offer-comment-form';
import MemorizedListComments from '@components/list-comments/list-comments';
import MemorizedMap from '@components/map/map';
import MemoizedListOffers from '@components/list-offers/list-offers';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import Loader from '@components/loader/loader';
import FavoriteButton from '@components/favorite-button/favorite-button';
import HelmetComponent from '@components/helmet-component/helmet-component';

function OfferPage(): JSX.Element | undefined {
  const { offerId } = useParams();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authSelectors.selectAuthorizationStatus);
  const offerStatusRequest = useAppSelector(offerSelectors.selectOfferStatus);
  const offerInfo = useAppSelector(offerSelectors.selectOffer);
  const nearOffers = useAppSelector(offerSelectors.selectNearByOffers);
  const comments = useAppSelector(commentsSelectors.selectComments);

  useEffect(() => {
    Promise.all([
      dispatch(fetchOfferByIdAction(offerId as string)),
      dispatch(fetchNearByOffersAction(offerId as string)),
      dispatch(fetchCommentsAction(offerId as string))
    ]);
  }, [dispatch, offerId]);

  if (offerStatusRequest === RequestStatus.Loading) {
    return (
      <Loader />
    );
  }

  if (offerStatusRequest === RequestStatus.Failed || !offerInfo) {
    return (
      <NotFoundPage />
    );
  }

  const threeNearOffers = nearOffers.slice(0, NEAR_OFFERS_COUNT);
  const nearOffersAndCurrent = [offerInfo, ...threeNearOffers];

  return (
    <Container isLoginNav classMain="page__main--offer">
      <HelmetComponent title='6 cities: offer' description='This page provides detailed information about the current offer: "6 cities: offer".'/>
      <section className="offer" data-testid='offer-section'>
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offerInfo?.images && offerInfo?.images.slice(0, IMAGES_COUNT).map((image) => (
              <div className="offer__image-wrapper" key={image}>
                <img className="offer__image" src={image} alt="Photo studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {offerInfo?.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}

            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offerInfo?.title}</h1>
              <FavoriteButton extraClass='offer' offerId={offerInfo.id} isFavorite={offerInfo.isFavorite} width={31} height={33} />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${getRating(offerInfo?.rating ?? 0)}%`}} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offerInfo?.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(offerInfo?.type ?? '')}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {pluralize(offerInfo?.bedrooms, 'Bedroom', 'Bedrooms')}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {pluralize(offerInfo?.maxAdults, 'adult', 'adults')}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{offerInfo?.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offerInfo?.goods.map((good) => (
                  <li className="offer__inside-item" key={good}>{good}</li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {'offer__avatar-wrapper--pro': offerInfo?.host.isPro})}>
                  <img className="offer__avatar user__avatar" src={offerInfo?.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                </div>
                <span className="offer__user-name">{offerInfo?.host.name}</span>
                {offerInfo?.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">{offerInfo?.description}</p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews · <span className="reviews__amount">{comments.length}</span></h2>
              <MemorizedListComments comments={comments}/>
              {
                isAuth(authorizationStatus) && <OfferCommentForm offerId={offerId ?? ''}/>
              }
            </section>
          </div>
        </div>
        <MemorizedMap extraClass='offer' city={offerInfo.city} offers={nearOffersAndCurrent} selectedOfferId={offerInfo.id}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <MemoizedListOffers offers={threeNearOffers} listBlock='near-places__list' block='near-places' />
        </section>
      </div>
    </Container>
  );
}

export default OfferPage;
