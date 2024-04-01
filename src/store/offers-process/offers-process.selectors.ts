import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';
import { SortType } from '../../const';
import { City } from '../../types/city';

export const getCityActive = (state: State): string => state[NameSpace.Offers].cityActive;

export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;

export const getCity = (state: State): City => state[NameSpace.Offers].city;

export const getSortType = (state: State): SortType => state[NameSpace.Offers].sortType;

export const getSortedOffers = (state: State): Offers => state[NameSpace.Offers].offers;

export const getOffersIsLoading = (state: State): boolean => state[NameSpace.Offers].offersIsLoading;

export const getOffersIsNotFound = (state: State): boolean => state[NameSpace.Offers].offersIsNotFound;
