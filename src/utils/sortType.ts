import { SortTypeOption } from '@const';
import { Offer } from '@type/offer';

type TSortOfferByType = {
  activeSortType: SortTypeOption;
  selectedOffers: Offer[];
}

export function sortOfferByType({activeSortType, selectedOffers}: TSortOfferByType): Offer[] {
  switch (activeSortType) {
    case SortTypeOption.PriceLowToHigh:
      selectedOffers = [...selectedOffers].sort((a, b) => a.price - b.price);
      break;
    case SortTypeOption.PriceHighToLow:
      selectedOffers = [...selectedOffers].sort((a, b) => b.price - a.price);
      break;
    case SortTypeOption.TopRatedFirst:
      selectedOffers = [...selectedOffers].sort((a, b) => b.rating - a.rating);
      break;
  }

  return selectedOffers;
}
