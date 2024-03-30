import React from 'react';
import { Reviews } from '../types/reviews';

type ReviewCardProps = {
  reviewCard: Reviews;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewCard }) => {
  const { comment, user, rating, date } = reviewCard;
  const { userName, avatarUrl } = user;
  const handleStars = (width: number) => `${Math.round(width) * 20}%`;

  const formattedDate = new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', day: 'numeric' });

  return (
    <ul className="reviews__list">
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img
              className="reviews__avatar user__avatar"
              src={avatarUrl}
              width={54}
              height={54}
              alt="Reviews avatar"
            />
          </div>
          <span className="reviews__user-name">{userName}</span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{ width: handleStars(rating) }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {comment}
          </p>
          <time className="reviews__time" dateTime={date}>
            {formattedDate}
          </time>
        </div>
      </li>
    </ul>
  );
};

export default ReviewCard;
