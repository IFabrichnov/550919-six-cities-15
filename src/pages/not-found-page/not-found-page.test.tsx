import { renderWithRouterAndProviders } from '@utils/mock-component';
import NotFoundPage from './not-found-page';
import { screen } from '@testing-library/react';

describe('Component: NotFoundPage', () => {
  it('should render component', () => {
    const expectedHeaderText = '404 Not Found';
    const expectedLinkText = 'Go to main page';

    renderWithRouterAndProviders(<NotFoundPage />);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
