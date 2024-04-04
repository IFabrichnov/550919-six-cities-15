import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';

export const getFavorites = (state: State): Offers => state[NameSpace.Favorites].favorites;
export const getFavoritesIsLoading = (state: State): boolean => state[NameSpace.Favorites].favoritesIsLoading;
export const getFavoritesIsNotFound = (state: State): boolean => state[NameSpace.Favorites].favoritesIsNotFound;
