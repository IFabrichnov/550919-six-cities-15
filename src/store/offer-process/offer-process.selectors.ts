import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offers';

export const getOffer = (state: State): Offer | null => state[NameSpace.Offer].offer;

export const getOfferIsLoading = (state: State): boolean => state[NameSpace.Offer].offerIsLoading;

export const getOfferIsNotFound = (state: State): boolean => state[NameSpace.Offer].offerIsNotFound;
