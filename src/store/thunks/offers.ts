import { Offer } from '@type/offer';
import { ApiRoute } from '@const';
import { createAppAsyncThunk } from '@hooks/index';

export const fetchOffersAction = createAppAsyncThunk<Offer[], undefined>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Offers);
    return data;
  }
);

export const fetchOfferByIdAction = createAppAsyncThunk<Offer, string>(
  'data/fetchOfferById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchNearByOffersAction = createAppAsyncThunk<Offer[], string>(
  'data/fetchNearByOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);
