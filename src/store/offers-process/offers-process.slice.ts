import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersProcess } from '../../types/state';
import { fetchOffersAction } from '../api-action';
import { sortOffers } from '../../utils';
import { NameSpace, SortType, DEFAULT_CITY, DEFAULT_LOCATION, DEFAULT_SORT } from '../../const';
import { Offers } from '../../types/offers';

const initialState: OffersProcess = {
  cityActive: DEFAULT_CITY,
  city: DEFAULT_LOCATION,
  sortType: DEFAULT_SORT,
  allOffers: [],
  offers: [],
  offersIsLoading: false,
  offersIsNotFound: false,
};

export const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setCityActive(state, action: PayloadAction<string>) {
      state.cityActive = action.payload;
    },

    getOffers(state) {
      if (state.allOffers.length) {
        const offersByCity = state.allOffers.filter(
          (item) => item?.city?.name === state.cityActive
        );
        state.offers = sortOffers(state.sortType, offersByCity);
      }
    },

    setChangeMap(state) {
      const cityMapActive = state.offers[0].city;
      state.city = cityMapActive;
    },

    getSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },

    setSortedOffers(state) {
      state.offers = sortOffers(state.sortType, state.offers);
    },

    loadOffers(state, action) {
      state.offers = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersIsLoading = true;
        state.offersIsNotFound = false;
      })

      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersIsLoading = false;
        state.offersIsNotFound = true;
      })

      .addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.allOffers = action.payload;
        state.offersIsLoading = false;

        offers.caseReducers.getOffers(state);
      });
  },
});

export const { getOffers, setCityActive, getSortType, setSortedOffers, setChangeMap } = offers.actions;
