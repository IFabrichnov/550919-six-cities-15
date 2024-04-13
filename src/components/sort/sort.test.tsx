import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import MemoizedSort from './sort';
import { SortTypeOption } from '@const';

describe('Component: SortBy', () => {
  it('should render correctly', () => {
    const sortTestId = 'sort';

    renderWithRouterAndProviders(<MemoizedSort currentType={SortTypeOption.Popular} setter={(option) => option} />);

    expect(screen.getByTestId(sortTestId)).toBeInTheDocument();
  });
});
