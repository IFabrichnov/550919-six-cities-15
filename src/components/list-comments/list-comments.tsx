import { Comment } from '@type/comment';
import { sortCommentsByDate } from '@utils/common';
import MemorizedCommentItem from '../comment-item/comment-item';
import { COMMENTS_COUNT } from '@const';
import { memo } from 'react';

type TListCommentsProps = {
  comments: Comment[];
}

function ListComments({ comments }: TListCommentsProps): JSX.Element {
  const sortedComments = sortCommentsByDate(comments).slice(0, COMMENTS_COUNT);
  return (
    <ul className="reviews__list" data-testid='reviews-list'>
      {sortedComments.map((comment) => <MemorizedCommentItem key={comment.id} comment={comment} />)}
    </ul>
  );
}

const MemorizedListComments = memo(ListComments);
export default MemorizedListComments;
