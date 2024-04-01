import { State } from '../../types/state';
import { NameSpace, AuthorizationStatus } from '../../const';
import { UserLogIn } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUser = (state: State): UserLogIn | null => state[NameSpace.User].user;
