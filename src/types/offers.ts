import { City } from './city';
import { Location } from './location';
import { Host } from './host';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  isPremium: boolean;
  isFavorite: boolean;
  description: string;
  previewImage: string;
  images: string[];
  location: Location;
  city: City;
  host: Host;
  goods: string[];
};

export type Offers = Offer[];


