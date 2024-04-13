import { RequestStatus } from '@const';
import { offerSlice } from './offer';
import { fetchNearByOffersAction, fetchOfferByIdAction } from '@store/thunks/offers';
import { makeFakeOffer } from '@utils/mocks';

describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { offer: null, status: RequestStatus.Idle, nearByOffers: []};

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { offer: null, status: RequestStatus.Idle, nearByOffers: []};

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "fetchOfferByIdAction.pending" action', () => {
    const initialState = { offer: null, status: RequestStatus.Idle, nearByOffers: []};
    const expectedState = { offer: null, status: RequestStatus.Loading, nearByOffers: []};

    const result = offerSlice.reducer(initialState, fetchOfferByIdAction.pending('offerId', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchOfferByIdAction.fulfilled" action', () => {
    const offer = makeFakeOffer();
    const initialState = { offer: null, status: RequestStatus.Loading, nearByOffers: []};
    const expectedState = { offer, status: RequestStatus.Success, nearByOffers: []};

    const result = offerSlice.reducer(initialState, fetchOfferByIdAction.fulfilled(offer, 'offerId', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "fetchOfferByIdAction.rejected" action', () => {
    const initialState = { offer: null, status: RequestStatus.Loading, nearByOffers: []};
    const expectedState = { offer: null, status: RequestStatus.Failed, nearByOffers: []};

    const result = offerSlice.reducer(initialState, fetchOfferByIdAction.rejected(null, 'offerId', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchNearByOffersAction.fullfilled" action', () => {
    const nearOffers = [makeFakeOffer()];
    const initialState = { offer: null, status: RequestStatus.Idle, nearByOffers: []};
    const expectedState = { offer: null, status: RequestStatus.Idle, nearByOffers: nearOffers};

    const result = offerSlice.reducer(initialState, fetchNearByOffersAction.fulfilled(nearOffers, 'offerId', ''));

    expect(result).toEqual(expectedState);
  });
});
