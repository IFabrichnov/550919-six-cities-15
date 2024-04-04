import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { NearOffersProcess } from '../../types/state';
import { fetchNearOffersAction } from '../api-action';
import { Offer } from '../../types/offers';

const initialState: NearOffersProcess = {
  nearOffers: [],
  nearOffersIsLoading: false,
  nearOffersIsNotFound: false,
};

export const nearOffers = createSlice({
  name: NameSpace.NearOffers,
  initialState,
  reducers: {
    setFavoriteNearOffers(state, action: PayloadAction<Offer>) {
      const favoriteNearOffers = action.payload;

      state.nearOffers = state.nearOffers.map((item: Offer) =>
        item.id === favoriteNearOffers.id ? favoriteNearOffers : item
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.nearOffersIsLoading = true;
        state.nearOffersIsNotFound = false;
      })

      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        const naerOffersData = action.payload;

        if (naerOffersData.length > 0) {
          state.nearOffers = naerOffersData;
        }

        state.nearOffersIsLoading = false;
      })

      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.nearOffersIsLoading = false;
        state.nearOffersIsNotFound = true;
      });
  },
});

export const { setFavoriteNearOffers } = nearOffers.actions;
