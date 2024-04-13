import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import MemoizedListOffers from './list-offers';
import { makeFakeOffer } from '@utils/mocks';

describe('Component: List offers', () => {
  const offer = makeFakeOffer();

  it('should render cities list correctly', () => {
    const citiesListTestId = 'cities__places-list';

    renderWithRouterAndProviders(<MemoizedListOffers offers={[offer]} listBlock='cities__places-list' block='cities'/>);

    expect(screen.getByTestId(citiesListTestId)).toBeInTheDocument();
  });

  it('should render neader offers list correctly', () => {
    const citiesListTestId = 'near-places__list';

    renderWithRouterAndProviders(<MemoizedListOffers offers={[offer]} listBlock='near-places__list' block='near-places'/>);

    expect(screen.getByTestId(citiesListTestId)).toBeInTheDocument();
  });
});
