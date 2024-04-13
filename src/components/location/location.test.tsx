import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import Location from './location';

describe('Component: Location', () => {
  it('should render correctly', () => {
    const locationTestId = 'location-item';

    renderWithRouterAndProviders(<Location location='Paris' isActive onLocationChange={() => locationTestId}/>);

    expect(screen.getByTestId(locationTestId)).toBeInTheDocument();
  });
});
