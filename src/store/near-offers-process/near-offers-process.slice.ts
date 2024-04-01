import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { NearOffersProcess } from '../../types/state';
import { fetchNearOffersAction } from '../api-action';

const initialState: NearOffersProcess = {
  nearOffers: [],
  nearOffersIsLoading: false,
  nearOffersIsNotFound: false,
};

export const nearOffers = createSlice({
  name: NameSpace.NearOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.nearOffersIsLoading = true;
        state.nearOffersIsNotFound = false;
      })

      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        const offersNearbyData = action.payload;

        if (offersNearbyData.length > 0) {
          state.nearOffers = offersNearbyData;
        }

        state.nearOffersIsLoading = false;
      })

      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.nearOffersIsLoading = false;
        state.nearOffersIsNotFound = true;
      });
  },
});
