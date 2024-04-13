import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: Favorites empty page', () => {
  it('should render correctly', () => {
    const favoritesEmptyTestId = 'favorites-empty';
    const favoritesEmptyText = /Nothing yet saved./i;

    render(<FavoritesEmpty />);

    expect(screen.getByTestId(favoritesEmptyTestId)).toBeInTheDocument();
    expect(screen.getByText(favoritesEmptyText)).toBeInTheDocument();
  });
});
