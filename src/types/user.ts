import {UserData} from '../types/user-data';

export type User = {
  avatarUrl: string;
  isPro: boolean;
  userName: string;
};

export type UserLogIn = UserData & {
  avatarUrl: string;
  isPro: boolean;
  name: string;
};
