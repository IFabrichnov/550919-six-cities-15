import { ApiRoute } from '@const';
import { Auth } from '@type/auth';
import { User } from '@type/user';
import { dropToken, saveToken } from '@services/token';
import { createAppAsyncThunk } from '@hooks/index';

export const checkAuthAction = createAppAsyncThunk<User, undefined>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(ApiRoute.Login);
    return data;
  }
);

export const loginAction = createAppAsyncThunk<User, Auth>(
  'user/login',
  async ({email, password}, { extra: api }) => {
    const { data } = await api.post<User>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAppAsyncThunk<void, undefined>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);
