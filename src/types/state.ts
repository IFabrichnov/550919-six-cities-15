import { store } from '../store/index';
import { Offers, Offer } from './offers';
import { City } from './city';
import { SortType } from '../const';
import { Reviews } from './reviews';
import { AuthorizationStatus } from '../const';
import { UserLogIn } from './user';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export type OffersProcess = {
  cityActive: string;
  city: City;
  sortType: SortType;
  allOffers: Offers;
  offers: Offers;
  offersIsLoading: boolean;
  offersIsNotFound: boolean;
};

export type OfferProcess = {
  offer: Offer | null;
  offerIsLoading: boolean;
  offerIsNotFound: boolean;
};

export type ReviewsProcess = {
  reviews: Reviews;
  reviewsIsLoading: boolean;
  reviewsIsNotFound: boolean;
};

export type NearOffersProcess = {
  nearOffers: Offers;
  nearOffersIsLoading: boolean;
  nearOffersIsNotFound: boolean;
};

export type UserProcess = {
  user: UserLogIn | null;
  authorizationStatus: AuthorizationStatus;
};

export type favoritesProcess = {
  favorites: Offers;
  favoritesIsLoading: boolean;
  favoritesIsNotFound: boolean;
};
