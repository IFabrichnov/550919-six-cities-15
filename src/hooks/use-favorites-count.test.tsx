import { renderHook } from '@testing-library/react';
import { makeFakeOffer } from '@utils/mocks';
import useFavoritesCount from './use-favorites-count';
import { setupStore } from '@store/index';
import { fetchFavoritesAction } from '@store/thunks/favorites';
import { Provider } from 'react-redux';

describe('Hook: userFavoritesCount', () => {
  const favoriteOffer = makeFakeOffer();
  const store = setupStore();
  const wrapper = ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;

  it('should return count 1', () => {
    store.dispatch(fetchFavoritesAction.fulfilled([favoriteOffer], '', undefined));
    const { result } = renderHook(() => useFavoritesCount(), { wrapper });
    expect(result.current).toBe(1);
  });

  it('should return count 3', () => {
    const favoriteOffers = Array.from({length: 3}, () => favoriteOffer);

    store.dispatch(fetchFavoritesAction.fulfilled(favoriteOffers, '', undefined));
    const { result } = renderHook(() => useFavoritesCount(), { wrapper });
    expect(result.current).toBe(3);
  });
});
