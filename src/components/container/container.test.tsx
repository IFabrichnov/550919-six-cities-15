import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import Container from './container';
import MainPage from '@pages/main-page/main-page';

describe('Component: Container', () => {
  it('should render the container', () => {
    const containerTestId = 'page__main--index';
    renderWithRouterAndProviders(<Container isLoginNav extraClass='page__main--index'><MainPage></MainPage></Container>);

    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
  });
});
