import { createSlice } from '@reduxjs/toolkit';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { NameSpace, AuthorizationStatus } from '../../const';
import { getToken } from '../../services/token';

export const saveUserToLocalStorage = (userData: UserProcess): void => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

export const getUserFromLocalStorage = (): UserProcess | null => {
  const userDataString = localStorage.getItem('userData');
  return userDataString ? JSON.parse(userDataString) as UserProcess : null;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('userData');
};

const token = getToken();
const userFromLocalStorage = getUserFromLocalStorage();

const initialState: UserProcess = {
  user: userFromLocalStorage || null,
  authorizationStatus: token ? AuthorizationStatus.Auth : AuthorizationStatus.Unknown,
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;

        if (userData) {
          state.user = userData;
          saveUserToLocalStorage(userData);
        }
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        removeUserFromLocalStorage();
      });
  },
});
