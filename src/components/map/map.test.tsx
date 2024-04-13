import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import { makeFakeOffer } from '@utils/mocks';
import MemorizedMap from './map';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const mapTestId = 'map';
    const offer = makeFakeOffer();

    renderWithRouterAndProviders(<MemorizedMap extraClass='cities__map' city={offer.city} offers={[offer]} selectedOfferId={offer.id}/>);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });
});
