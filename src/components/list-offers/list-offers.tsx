import { Offer } from '@type/offer';
import MemoizedCard from '../card/card';
import { memo } from 'react';

type TListOffers = {
  offers: Offer[];
  onOfferHover?: (offer: Offer | null) => void;
  listBlock: string;
  extraClass?: string;
  block: string;
}

function ListOffers({ offers, onOfferHover, listBlock, extraClass, block }: TListOffers): JSX.Element {
  return (
    <div className={`${listBlock} places__list ${extraClass}`} data-testid={`${listBlock}`}>
      {offers.map((offer) => <MemoizedCard key={offer.id} offer={offer} block={block} onMouseOver={onOfferHover}/>)}
    </div>
  );
}

const MemoizedListOffers = memo(ListOffers);
export default MemoizedListOffers;
