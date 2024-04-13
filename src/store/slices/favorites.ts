import { FavoriteStatus, RequestStatus } from '@const';
import { createSlice } from '@reduxjs/toolkit';
import { changeFavoriteAction, fetchFavoritesAction } from '@store/thunks/favorites';
import { Offer } from '@type/offer';

type FavoriteState = {
  favoriteOffers: Offer[];
  status: RequestStatus;
}

const initialState: FavoriteState = {
  favoriteOffers: [],
  status: RequestStatus.Idle
};

const favoritesSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        switch(action.payload.status) {
          case FavoriteStatus.Added:
            state.favoriteOffers.push(action.payload.offer);
            break;
          case FavoriteStatus.Removed:
            state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.offer.id);
        }
        state.status = RequestStatus.Success;
      })
      .addCase(changeFavoriteAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(changeFavoriteAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      }),
  name: 'favorites',
  initialState,
  reducers: {},
  selectors: {
    selectFavoriteOffers: (state: FavoriteState) => state.favoriteOffers,
    selectFavoritesStatus: (state: FavoriteState) => state.status
  }
});

const favoritesAction = { ...favoritesSlice.actions, fetchFavoritesAction, changeFavoriteAction };
const favoritesSelectors = { ...favoritesSlice.selectors };

export { favoritesSlice, favoritesAction, favoritesSelectors };
