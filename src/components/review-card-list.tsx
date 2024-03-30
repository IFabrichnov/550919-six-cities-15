import ReviewCard from './review-card';
import { Reviews } from '../types/reviews';
import ReviewForm from './review-form';
import { useAppSelector } from '../hooks';
import { AuthorizationStatus } from '../const';

type ReviewsCardListProps = {
  reviewList: Reviews;
  offerId?: string;
};

function ReviewsList({ reviewList, offerId }: ReviewsCardListProps): JSX.Element {
  const MIN_REVIEWS_COUNT = 0;
  const MAX_REVIEWS_COUNT = 10;
  const maxReviews = reviewList.slice(MIN_REVIEWS_COUNT, Math.min(MAX_REVIEWS_COUNT, reviewList.length))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <div>
        <h2 className="reviews__title">
          Reviews · <span className="reviews__amount">{maxReviews.length}</span>
        </h2>
        {maxReviews.map((review) => {
          const keyValue = review.id;
          return (
            <ReviewCard key={keyValue} reviewCard={review} />
          );
        })}
        {authorizationStatus === AuthorizationStatus.Auth && (
          <ReviewForm offerId={offerId} />
        )}
      </div>
    </section>
  );
}

export default ReviewsList;
