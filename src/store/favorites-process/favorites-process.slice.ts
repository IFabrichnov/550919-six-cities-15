import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import {FavoritesProcess} from '../../types/state';
import { fetchFavoritesAction, setFavoritesAction } from '../api-action';

const initialState: FavoritesProcess = {
  favorites: [],
  favoritesIsLoading: false,
  favoritesIsNotFound: false,
};

export const favorites = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.favoritesIsLoading = true;
        state.favoritesIsNotFound = false;
      })

      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoritesIsLoading = false;
        state.favoritesIsNotFound = true;
      })

      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        const favoriteOfferData = action.payload;

        if (favoriteOfferData.length > 0) {
          state.favorites = favoriteOfferData;
        } else {
          state.favoritesIsNotFound = true;
        }

        state.favoritesIsLoading = false;
      })

      .addCase(setFavoritesAction.fulfilled, (state, action) => {
        const favoriteOfferData = action.payload;
        if (favoriteOfferData?.isFavorite) {
          state.favorites.push(favoriteOfferData);
        } else {
          state.favorites = state.favorites.filter(
            (item) => item.id !== favoriteOfferData.id
          );
        }
      });
  },
});
