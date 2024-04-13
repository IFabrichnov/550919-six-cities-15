import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import MemoizedHeader from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const headerTestId = 'header';

    renderWithRouterAndProviders(<MemoizedHeader isLoginNav/>);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
  });
});
