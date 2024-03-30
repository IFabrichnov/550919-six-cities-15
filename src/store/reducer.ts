import { createReducer } from '@reduxjs/toolkit';
import {
  setCityActive,
  getOffers,
  setChangeMap,
  getSortType,
  setSortOffers,
  loadOffers,
  requireAuthorization,
  setError,
  setUser,
} from './action';
import {DEFAULT_CITY, defaultLocation, SortType} from '../const';
import {sortOffers} from '../utils';
import { AuthorizationStatus } from '../const';
import { Offers } from '../types/offers';
import { City } from '../types/city';
import { UserLogIn } from '../types/user';

type InitalState = {
  cityActive: string;
  allOffers: Offers;
  offers: Offers;
  offersIsLoading: boolean;
  city: City;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  user: UserLogIn | null;
  isFavorite: boolean;
}

const initialState: InitalState = {
  cityActive: DEFAULT_CITY,
  allOffers: [],
  offers: [],
  offersIsLoading: false,
  city: defaultLocation,
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  user: null,
  isFavorite:false,
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
      state.city = action.payload.name;
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

    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })

    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })

    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export { reducer };
