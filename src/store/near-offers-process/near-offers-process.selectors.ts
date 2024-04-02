import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';

export const getNearOffers = (state: State): Offers => state[NameSpace.NearOffers].nearOffers;

export const getNearOffersIsLoading = (state: State): boolean => state[NameSpace.NearOffers].nearOffersIsLoading;

export const getNearOffersIsNotFound = (state: State): boolean => state[NameSpace.NearOffers].nearOffersIsNotFound;
