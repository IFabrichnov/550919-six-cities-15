import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import { makeFakeOffer } from '@utils/mocks';
import FavoriteList from './favorites-list';

describe('Component: Favorite list', () => {
  it('should render correctly', () => {
    const offer = makeFakeOffer();
    const listTestId = 'favorite-list';
    renderWithRouterAndProviders(<FavoriteList offers={[offer]} />);

    expect(screen.getByTestId(listTestId)).toBeInTheDocument();
  });
});
