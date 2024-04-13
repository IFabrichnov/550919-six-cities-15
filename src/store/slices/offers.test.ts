import { LOCATIONS, RequestStatus } from '@const';
import { offersSlice } from './offers';
import { fetchOffersAction } from '@store/thunks/offers';
import { makeFakeOffer } from '@utils/mocks';

describe('Offers Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { offers: [], status: RequestStatus.Idle, location: LOCATIONS[0] };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { offers: [], status: RequestStatus.Idle, location: LOCATIONS[0] };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "fetchOffersAction.pending" action', () => {
    const initialState = { offers: [], status: RequestStatus.Idle, location: LOCATIONS[0] };
    const expectedState = { offers: [], status: RequestStatus.Loading, location: LOCATIONS[0] };

    const result = offersSlice.reducer(initialState, fetchOffersAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchOffersAction.fulfilled" action', () => {
    const offers = [makeFakeOffer()];
    const initialState = { offers: [], status: RequestStatus.Loading, location: LOCATIONS[0] };
    const expectedState = { offers, status: RequestStatus.Success, location: LOCATIONS[0] };

    const result = offersSlice.reducer(initialState, fetchOffersAction.fulfilled(offers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "fetchOffersAction.rejected" action', () => {
    const initialState = { offers: [], status: RequestStatus.Loading, location: LOCATIONS[0] };
    const expectedState = { offers: [], status: RequestStatus.Failed, location: LOCATIONS[0] };

    const result = offersSlice.reducer(initialState, fetchOffersAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Location" action', () => {
    const location = 'Amsterdam';
    const initialState = { offers: [], status: RequestStatus.Idle, location: LOCATIONS[0] };
    const expectedState = { offers: [], status: RequestStatus.Idle, location };

    const result = offersSlice.reducer(initialState, offersSlice.actions.setLocation(location));

    expect(result).toEqual(expectedState);
  });

  it('should update offer with "updateOffers" action', () => {
    const offer = makeFakeOffer();
    const initialState = { offers: [offer], status: RequestStatus.Idle, location: LOCATIONS[0] };
    const expectedState = { offers: [{ ...offer, isFavorite: !offer.isFavorite }], status: RequestStatus.Idle, location: LOCATIONS[0] };

    const result = offersSlice.reducer(initialState, offersSlice.actions.updateOffers(offer.id));

    expect(result).toEqual(expectedState);
  });
});
