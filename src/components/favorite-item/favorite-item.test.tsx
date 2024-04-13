import { renderWithRouterAndProviders } from '@utils/mock-component';
import FavoriteItem from './favorite-item';
import { makeFakeOffer } from '@utils/mocks';
import { screen } from '@testing-library/react';

describe('Component: Favorite item', () => {
  it('should render correctly', () => {
    const favoriteItemTestId = 'favorite-item';
    const offer = makeFakeOffer();
    renderWithRouterAndProviders(<FavoriteItem offers={[offer]} city={offer.city.name} />);

    expect(screen.getByTestId(favoriteItemTestId)).toBeInTheDocument();
  });
});
