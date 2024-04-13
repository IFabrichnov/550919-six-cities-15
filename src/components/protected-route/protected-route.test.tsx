import { screen } from '@testing-library/react';
import { AppRoute } from '@const';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import App from '../../app';

describe('Component: ProtectedRoute', () => {
  it('should render component for public route, when user not authorized', () => {
    const notExpectedTestId = 'favorites-empty';
    const expectedTestId = 'login-section';
    renderWithRouterAndProviders(<App />, {route: AppRoute.Favorites});

    expect(screen.queryByTestId(notExpectedTestId)).not.toBeInTheDocument();
    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
