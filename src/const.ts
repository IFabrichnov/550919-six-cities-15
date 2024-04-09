import { CityMap } from './types/city-map';
import { CityList, City } from './types/city';

export enum AppRoutes {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Offer = '/offer/:id',
  NotFound = '*',
}

export const PRIVATE_ROUTES: readonly string[] = ['/favorites'];

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const handleStars = (width: number) => `${String(Math.round(width) * 20)}%`;

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

export const cityMap: CityMap[] = [
  {
    title: 'Amsterdam',
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 12,
  },
  {
    title: 'Paris',
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 12
  },
  {
    title: 'Cologne',
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 12
  },
  {
    title: 'Brussels',
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 12
  },
  {
    title: 'Hamburg',
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 12
  },
  {
    title: 'Dusseldorf',
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 12
  },
];

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
] as const;

export const DEFAULT_CITY = CITY_LIST.Paris;

export const DEFAULT_LOCATION: City = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
} as const;

export const [defaultLocation] = cityMap.filter((item) => item.title === DEFAULT_CITY);

export const citiesList = [
  CITY_LIST.Paris,
  CITY_LIST.Cologne,
  CITY_LIST.Brussels,
  CITY_LIST.Amsterdam,
  CITY_LIST.Hamburg,
  CITY_LIST.Dusseldorf
];

export type CityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export type SortName = SortType.Popular | SortType.LowToHigh | SortType.HighToLow | SortType.TopRated;

export const DEFAULT_SORT = SortType.Popular;

export enum ApiRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout'
}

export const TIMEOUT_SHOW_ERROR = 2000;

export enum NameSpace {
  User = 'USER',
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Reviews = 'REVIEWS',
  NearOffers = 'NEAROFFERS',
  Favorites = 'FAVORITES',
  Error = 'ERROR'
}


export enum FavoritesUpdate {
  Offers = 'UpdateOffers',
  Offer = 'UpdateOffer',
  Favorites = 'UpdateFavorites',
  NearOffers = 'UpdateNearOffers',
}
