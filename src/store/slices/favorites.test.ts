import { FavoriteStatus, RequestStatus } from '@const';
import { favoritesSlice } from './favorites';
import { changeFavoriteAction, fetchFavoritesAction } from '@store/thunks/favorites';
import { makeFakeOffer } from '@utils/mocks';

describe('Favorite Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { favoriteOffers: [], status: RequestStatus.Idle };

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { favoriteOffers: [], status: RequestStatus.Idle };

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "fetchFavoritesAction.pending" action', () => {
    const initialState = { favoriteOffers: [], status: RequestStatus.Idle };
    const expectedState = { favoriteOffers: [], status: RequestStatus.Loading };

    const result = favoritesSlice.reducer(initialState, fetchFavoritesAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchFavoritesAction.fulfilled" action', () => {
    const favoriteOffers = [makeFakeOffer()];
    const initialState = { favoriteOffers: [], status: RequestStatus.Loading };
    const expectedState = { favoriteOffers, status: RequestStatus.Success };

    const result = favoritesSlice.reducer(initialState, fetchFavoritesAction.fulfilled(favoriteOffers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "fetchFavoritesAction.rejected" action', () => {
    const initialState = { favoriteOffers: [], status: RequestStatus.Loading };
    const expectedState = { favoriteOffers: [], status: RequestStatus.Failed };

    const result = favoritesSlice.reducer(initialState, fetchFavoritesAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "changeFavoriteAction.pending" action', () => {
    const initialState = { favoriteOffers: [], status: RequestStatus.Idle };
    const expectedState = { favoriteOffers: [], status: RequestStatus.Loading };

    const result = favoritesSlice.reducer(initialState, changeFavoriteAction.pending('', { offerId: '', status: FavoriteStatus.Added}));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "changeFavoriteAction.fulfilled" action', () => {
    const offer = makeFakeOffer();
    const initialState = { favoriteOffers: [], status: RequestStatus.Loading };
    const expectedState = { favoriteOffers: [offer], status: RequestStatus.Success };

    const result = favoritesSlice.reducer(initialState, changeFavoriteAction.fulfilled({offer, status: FavoriteStatus.Added}, 'offerId', { offerId: 'offerId', status: FavoriteStatus.Added }));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "changeFavoriteAction.rejected" action', () => {
    const initialState = { favoriteOffers: [], status: RequestStatus.Loading };
    const expectedState = { favoriteOffers: [], status: RequestStatus.Failed };

    const result = favoritesSlice.reducer(initialState, changeFavoriteAction.rejected(null, 'offerId', { offerId: 'offerId', status: FavoriteStatus.Added }));

    expect(result).toEqual(expectedState);
  });
});
