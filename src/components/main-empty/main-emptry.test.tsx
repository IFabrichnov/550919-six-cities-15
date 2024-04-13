import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import MainEmpty from './main-empty';

describe('Component: Main empty', () => {
  it('should render correctly', () => {
    const expectedText = /No places to stay available/i;
    renderWithRouterAndProviders(<MainEmpty />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
