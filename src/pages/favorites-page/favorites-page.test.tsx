import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import { makeFakeOffer } from '@utils/mocks';
import FavoritesPage from './favorites-page';
import { setupStore } from '@store/index';
import { fetchFavoritesAction } from '@store/thunks/favorites';

describe('Favarite page', () => {
  it('should render correctly', () => {
    const offer = makeFakeOffer();
    const store = setupStore();
    store.dispatch(fetchFavoritesAction.fulfilled([offer], '', undefined));
    const favoriteTestId = 'favorites-page';

    renderWithRouterAndProviders(<FavoritesPage />, { store });

    expect(screen.getByTestId(favoriteTestId)).toBeInTheDocument();
  });
});
