import { CityList } from './types/city';

export enum AppRoutes {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = './public/img/pin.svg';
export const URL_MARKER_CURRENT = './public/img/pin-active.svg';

export const CITY_LIST: CityList = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

export const citiesList = Object.values(CITY_LIST);

export const DEFAULT_CITY = CITY_LIST.Paris;

export const defaultLocation = CITY_LIST.Amsterdam;

export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum ApiRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout'
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const PRIVATE_ROUTES: readonly string[] = ['/favorites'];

export enum NameSpace {
  Offers = 'OFFERS',
  Favorites = 'FAVORITES',
  Reviews = 'REVIEWS',
  User = 'USER',
  Data = 'DATA',
  Error = 'ERROR'
}
