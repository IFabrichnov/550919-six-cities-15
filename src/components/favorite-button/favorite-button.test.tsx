import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import FavoriteButton from './favorite-button';

describe('Component: Favorite button', () => {
  it('should render correctly', () => {
    const favoriteButtonTestId = 'favorite-button';
    renderWithRouterAndProviders(<FavoriteButton offerId="1" />);

    expect(screen.getByTestId(favoriteButtonTestId)).toBeInTheDocument();
  });
});
