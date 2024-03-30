import { createReducer } from '@reduxjs/toolkit';
import {
  setCityActive,
  getOffers,
  setChangeMap,
  getSortType,
  setSortOffers,
  loadOffers,
  loadOffer,
  setOffersIsLoading,
  setOfferIsLoading,
  setOfferIsNotFound,
  loadNearOffers,
  setNearOffersIsLoading,
  setNearOffersIsNotFound,
  requireAuthorization,
  setUser,
  addReviews,
} from './action';
import {DEFAULT_CITY, defaultLocation, SortType} from '../const';
import {sortOffers} from '../utils';
import { AuthorizationStatus } from '../const';
import { Offers, Offer } from '../types/offers';
import { CityMap } from '../types/city-map';
import { UserLogIn } from '../types/user';
import { Reviews } from '../types/reviews';

type InitalState = {
  cityActive: string;
  allOffers: Offers;
  offers: Offers;
  offer: Offer | null;
  offersIsLoading: boolean;
  offerIsLoading: boolean;
  offerIsNotFound: boolean;
  nearOffers: Offers;
  nearOffersIsLoading: boolean;
  nearOffersIsNotFound: boolean;
  city: CityMap;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  user: UserLogIn | null;
  reviews: Reviews;
}

const initialState: InitalState = {
  cityActive: DEFAULT_CITY,
  allOffers: [],
  offers: [],
  offer: null,
  offersIsLoading: false,
  offerIsLoading: false,
  offerIsNotFound: false,
  nearOffers: [],
  nearOffersIsLoading: false,
  nearOffersIsNotFound: false,
  city: defaultLocation,
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  user: null,
  reviews: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityActive, (state, action) => {
      state.cityActive = action.payload;
    })

    .addCase(getOffers, (state) => {
      if (state.allOffers.length) {
        const offersByCity = state.allOffers.filter(
          (item) => item?.city?.name === state.cityActive
        );
        state.offers = sortOffers(state.sortType, offersByCity);
      }
    })

    .addCase(setChangeMap, (state, action) => {
      state.city = action.payload;
    })

    .addCase(getSortType, (state, action) => {
      state.sortType = action.payload;
    })

    .addCase(setSortOffers, (state) => {
      state.offers = sortOffers(state.sortType, state.offers);
    })

    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })

    .addCase(setOffersIsLoading, (state, action) => {
      state.offersIsLoading = action.payload;
    })

    .addCase(setOfferIsLoading, (state, action) => {
      state.offerIsLoading = action.payload;
    })

    .addCase(setOfferIsNotFound, (state, action) => {
      state.offerIsNotFound = action.payload;
    })

    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })

    .addCase(setNearOffersIsLoading, (state, action) => {
      state.nearOffersIsLoading = action.payload;
    })

    .addCase(setNearOffersIsNotFound, (state, action) => {
      state.nearOffersIsNotFound = action.payload;
    })

    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })

    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })

    .addCase(addReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export { reducer };
