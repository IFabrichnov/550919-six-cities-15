import { AuthorizationStatus, RequestStatus } from '@const';
import { authSlice } from './auth';
import { checkAuthAction, loginAction, logoutAction } from '@store/thunks/auth';
import { makeFakeUser } from '@utils/mocks';

describe('Auth Slice', () => {
  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Unknown, userData: null, status: RequestStatus.Idle };

    const result = authSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Unknown, userData: null, status: RequestStatus.Idle };

    const result = authSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const userData = makeFakeUser();
    const initialState = { authorizationStatus: AuthorizationStatus.NoAuth, userData: null, status: RequestStatus.Idle };
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth, userData, status: RequestStatus.Success };

    const result = authSlice.reducer(initialState, checkAuthAction.fulfilled(userData, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth, userData: null, status: RequestStatus.Success };
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, userData: null, status: RequestStatus.Failed };

    const result = authSlice.reducer(initialState, checkAuthAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const userData = {
      name: 'Test',
      avatarUrl: 'test.png',
      isPro: false,
      email: 'test@test',
      token: 'secret'
    };

    const initialState = { authorizationStatus: AuthorizationStatus.NoAuth, userData: null, status: RequestStatus.Idle };
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth, userData, status: RequestStatus.Success };

    const result = authSlice.reducer(initialState, loginAction.fulfilled(userData, '', { email: 'test@test.com', password: '123456i'}));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth, userData: null, status: RequestStatus.Idle };
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, userData: null, status: RequestStatus.Failed };

    const result = authSlice.reducer(initialState, loginAction.rejected(null, '', { email: 'test@test', password: '1'}));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth, userData: null, status: RequestStatus.Idle };
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, userData: null, status: RequestStatus.Success };

    const result = authSlice.reducer(initialState, logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
