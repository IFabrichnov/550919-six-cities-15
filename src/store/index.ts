import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { offersSlice } from '@store/slices/offers';
import { createAPI } from '@services/api';
import { authSlice } from '@store/slices/auth';
import { offerSlice } from '@store/slices/offer';
import { commentsSlice } from '@store/slices/comments';
import { favoritesSlice } from '@store/slices/favorites';

export const api = createAPI();

const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [favoritesSlice.name]: favoritesSlice.reducer
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare({
        thunk: {
          extraArgument: api
        }
      })
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
