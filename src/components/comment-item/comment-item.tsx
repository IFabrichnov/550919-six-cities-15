import { Comment } from '@type/comment';
import { formatDateToISO, getRating, humanizeDate } from '@utils/common';
import { memo } from 'react';

type TCommentItemProps = {
  comment: Comment;
}

function CommentItem({ comment }: TCommentItemProps): JSX.Element {
  return (
    <li className="reviews__item" data-testid='review-item'>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name" data-testid='user-name'>
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRating(comment.rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={formatDateToISO(comment.date)}>{humanizeDate(comment.date)}</time>
      </div>
    </li>
  );
}

const MemorizedCommentItem = memo(CommentItem);
export default MemorizedCommentItem;
