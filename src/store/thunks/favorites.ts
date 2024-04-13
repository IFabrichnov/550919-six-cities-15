import { ApiRoute, FavoriteStatus } from '@const';
import { createAppAsyncThunk } from '@hooks/index';
import { Offer } from '@type/offer';

type FavoriteProps = {
  offerId: string;
  status: FavoriteStatus;
};

type ChangeResponse = {
  offer: Offer;
  status: FavoriteStatus;
}

export const fetchFavoritesAction = createAppAsyncThunk<Offer[], undefined>(
  'data/fetchFavorites',
  async (_args, { extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Favorites);
    return data;
  }
);

export const changeFavoriteAction = createAppAsyncThunk<ChangeResponse, FavoriteProps>(
  'data/changeFavorite',
  async ({offerId, status}, { extra: api }) => {
    const { data } = await api.post<Offer>(`${ApiRoute.Favorites}/${offerId}/${status}`);
    return { offer: data, status };
  }
);
