import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offers } from './offers-process/offers-process.slice';
import { offer } from './offer-process/offer-process.slice';
import { reviews } from './reviews-process/reviews-process.slice';
import { nearOffers } from './near-offers-process/near-offers-process.slice';
import { user } from './user-process/user-process.slice';
import { favorites } from './favorites-process/favorites-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.Offer]: offer.reducer,
  [NameSpace.User]: user.reducer,
  [NameSpace.Reviews]: reviews.reducer,
  [NameSpace.NearOffers]: nearOffers.reducer,
  [NameSpace.Favorites]: favorites.reducer,
});
