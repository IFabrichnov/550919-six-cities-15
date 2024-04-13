import { render, screen } from '@testing-library/react';
import MemorizedCommentItem from './comment-item';
import { makeFakeComment } from '@utils/mocks';

describe('Component: Comment item', () => {
  it('should render correctly', () => {
    const comment = makeFakeComment();
    const commentTestId = 'review-item';
    const userNameTestId = 'user-name';

    render(<MemorizedCommentItem comment={comment}/>);

    const commentUserContainer = screen.getByTestId(userNameTestId);

    expect(screen.getByTestId(commentTestId)).toBeInTheDocument();
    expect(commentUserContainer).toBeInTheDocument();
    expect(commentUserContainer).toHaveTextContent(comment.user.name);
  });
});
