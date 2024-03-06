import { Offers } from '../types/offers';

export const offers: Offers = [
  {
    id: 0,
    name: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 180,
    isPremium: false,
    isFavorite: true,
    rating: 5,
    bedrooms: 3,
    maxAdults: 4,
    previewImage: 'img/apartment-01.jpg',
    description: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from the 18th century.',
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 12,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    host: {
      hostName: 'Angelina',
      isPro: true,
      avatarUrl: 'https://i.pravatar.cc/128',
    },
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
  },
  {
    id: 1,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    isPremium: false,
    isFavorite: false,
    rating: 4.5,
    bedrooms: 2,
    maxAdults: 3,
    previewImage: 'img/apartment-02.jpg',
    description: 'Bright, cozy and spacious apartment in the heart of the city overlooking the picturesque canal.',
    images: ['img/apartment-02.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg'],
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.367573,
        longitude: 4.904138,
        zoom: 12,
      },
    },
    location: {
      latitude: 52.367573,
      longitude: 4.904138,
      zoom: 12,
    },
    host: {
      hostName: 'John',
      isPro: false,
      avatarUrl: 'https://i.pravatar.cc/128',
    },
    goods: ['Wi-Fi', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
  },
  {
    id: 2,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    isPremium: true,
    isFavorite: true,
    rating: 4.8,
    bedrooms: 4,
    maxAdults: 6,
    previewImage: 'img/apartment-03.jpg',
    description: 'Luxury apartment located in the heart of the city. Spacious and cozy.',
    images: ['img/apartment-03.jpg', 'img/apartment-02.jpg', 'img/apartment-01.jpg'],
    city: {
      name: 'Paris',
      location: {
        latitude: 48.856613,
        longitude: 2.352222,
        zoom: 12,
      },
    },
    location: {
      latitude: 48.856613,
      longitude: 2.352222,
      zoom: 12,
    },
    host: {
      hostName: 'Oliver',
      isPro: true,
      avatarUrl: 'https://i.pravatar.cc/128',
    },
    goods: ['Wi-Fi', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
  },
  {
    id: 3,
    name: 'Wood and stone place',
    type: 'Room',
    price: 80,
    isPremium: true,
    isFavorite: false,
    rating: 4,
    bedrooms: 1,
    maxAdults: 2,
    previewImage: 'img/room.jpg',
    description: 'Cozy room with wooden and stone interior elements. Perfect for a romantic getaway.',
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg'],
    city: {
      name: 'Berlin',
      location: {
        latitude: 52.520008,
        longitude: 13.404954,
        zoom: 12,
      },
    },
    location: {
      latitude: 52.520008,
      longitude: 13.404954,
      zoom: 12,
    },
    host: {
      hostName: 'Mia',
      isPro: false,
      avatarUrl: 'https://i.pravatar.cc/128',
    },
    goods: ['Wi-Fi', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
  },
];