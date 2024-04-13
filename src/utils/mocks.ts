import { internet, lorem, name } from 'faker';
import { User } from '@type/user';
import { Comment } from '@type/comment';
import { Offer } from '@type/offer';

export const makeFakeUser = (): User => ({
  name: name.title(),
  avatarUrl: internet.avatar(),
  isPro: false,
  email: internet.email(),
  token: 'secret'
});

export const makeFakeComment = (): Comment => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString(),
  user: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: false,
  },
  comment: lorem.text(),
  rating: Math.floor(Math.random() * 5) + 1,
});

export const makeFakeOffer = (): Offer => ({
  id: crypto.randomUUID(),
  city: {
    name: name.title(),
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 12,
    },
  },
  title: name.title(),
  type: 'room',
  price: Math.floor(Math.random() * 100) + 1,
  rating: Math.floor(Math.random() * 5) + 1,
  isFavorite: false,
  isPremium: false,
  previewImage: internet.url(),
  images: [internet.url()],
  bedrooms: Math.floor(Math.random() * 4) + 1,
  maxAdults: Math.floor(Math.random() * 10) + 1,
  goods: [lorem.word()],
  host: {
    name: name.title(),
    isPro: false,
    avatarUrl: internet.avatar(),
  },
  description: lorem.paragraph(),
  location: {
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 12,
  },
});
