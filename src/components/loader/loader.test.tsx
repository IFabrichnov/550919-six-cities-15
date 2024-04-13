import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correct', () => {
    const loaderTestId = 'loader';

    render(<Loader />);

    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
  });
});
