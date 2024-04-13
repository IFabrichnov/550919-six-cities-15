import { screen } from '@testing-library/react';
import Logo from './logo';
import { renderWithRouterAndProviders } from '@utils/mock-component';

describe('Component: Logo', () => {
  it('should render the component', () => {
    const logoLinkTestId = 'logo-link';

    renderWithRouterAndProviders(<Logo />);

    expect(screen.getByTestId(logoLinkTestId)).toBeInTheDocument();
  });
});
