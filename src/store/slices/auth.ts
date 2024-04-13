import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, RequestStatus } from '@const';
import { User } from '@type/user';
import { checkAuthAction, loginAction, logoutAction } from '@store/thunks/auth';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  userData: User | null;
  status: RequestStatus;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  status: RequestStatus.Idle
};

function processSuccess(state: AuthState, action: PayloadAction<User>) {
  state.userData = action.payload;
  state.status = RequestStatus.Success;
  state.authorizationStatus = AuthorizationStatus.Auth;
}

function processFailed(state: AuthState) {
  state.status = RequestStatus.Failed;
  state.authorizationStatus = AuthorizationStatus.NoAuth;
}

function processLoading(state: AuthState) {
  state.status = RequestStatus.Loading;
}

const authSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(checkAuthAction.fulfilled, processSuccess)
      .addCase(checkAuthAction.rejected, processFailed)
      .addCase(checkAuthAction.pending, processLoading)
      .addCase(loginAction.pending, processLoading)
      .addCase(loginAction.fulfilled, processSuccess)
      .addCase(loginAction.rejected, processFailed)
      .addCase(logoutAction.fulfilled, (state) => {
        state.userData = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.status = RequestStatus.Success;
      }),
  initialState,
  name: 'auth',
  reducers: {},
  selectors: {
    selectAuthorizationStatus: (state: AuthState) => state.authorizationStatus,
    selectUserData: (state: AuthState) => state.userData,
    selectUserStatus: (state: AuthState) => state.status
  }
});

const authActions = authSlice.actions;
const authSelectors = {...authSlice.selectors};

export { authActions, authSlice, authSelectors };
