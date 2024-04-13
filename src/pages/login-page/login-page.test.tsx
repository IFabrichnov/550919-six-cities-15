import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import LoginPage from './login-page';

describe('Login page', () => {
  it('should render correctly', () => {
    renderWithRouterAndProviders(<LoginPage />);

    expect(screen.getByTestId('login-section')).toBeInTheDocument();
  });
});
