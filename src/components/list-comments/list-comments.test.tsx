import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '@utils/mocks';
import MemorizedListComments from './list-comments';

describe('Component: List comments', () => {
  it('should render correctly', () => {
    const comment = makeFakeComment();
    const commentListTestId = 'reviews-list';

    render(
      <MemorizedListComments comments={[comment]} />
    );

    expect(screen.getByTestId(commentListTestId)).toBeInTheDocument();
  });
});
