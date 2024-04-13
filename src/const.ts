export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
export const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum ApiRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorites = '/favorite'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const enum RequestStatus { Idle, Loading, Success, Failed }
export const enum FavoriteStatus { Removed, Added }

export const TOTAL_RAITING_STATUS = 5;
export const NEAR_OFFERS_COUNT = 3;
export const COMMENTS_COUNT = 10;
export const IMAGES_COUNT = 6;
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const RATINGS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

export const SORT_TYPES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] satisfies Record<SortTypeOption, string>;
export enum SortTypeOption {
  Popular = 0,
  PriceLowToHigh = 1,
  PriceHighToLow = 2,
  TopRatedFirst = 3
}

export const LOCATIONS = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const COMMENT_DATE_FORMAT = 'MMMM YYYY';
export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
