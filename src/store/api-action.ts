import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offers, Offer } from '../types/offers';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { ApiRoute, AppRoutes } from '../const';
import { AuthData } from '../types/auth-data';
import { UserLogIn } from '../types/user';
import { Reviews, Review } from '../types/reviews';
import { Comments } from '../types/comments';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(ApiRoute.Offers);

    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffer',
    async (_arg, { extra: api }) => {
      const id = _arg;
      const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
      return data;
    },
  );

export const fetchNearOffersAction = createAsyncThunk<Offers, number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchNearPlacesAction',
    async (_arg, { extra: api }) => {
      const id = _arg;
      const { data } = await api.get<Offers>(`${ApiRoute.Offers}/${id}/nearby`);
      return data;
    });

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get(ApiRoute.Login);
  },
);

export const loginAction = createAsyncThunk<UserLogIn, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserLogIn>(ApiRoute.Login, { email, password });
    const { token } = data;

    saveToken(token);
    dispatch(redirectToRoute(AppRoutes.Main));

    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number | string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (_arg, { extra: api }) => {
    const id = _arg;
    const { data } = await api.get<Reviews>(`${ApiRoute.Comments}/${id}`);

    return data;
  });

export const submitCommentAction = createAsyncThunk<Review, Comments, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
  >(
    'submitComments',
    async ({ id, comment, rating }, { extra: api }) => {
      const { data } = await api.post<Review>(`${ApiRoute.Comments}/${id}`, {
        comment: comment,
        rating: rating,
      });

      return data;
    }
  );
