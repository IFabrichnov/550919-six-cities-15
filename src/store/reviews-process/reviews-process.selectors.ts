import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Reviews } from '../../types/reviews';

export const getReviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;

export const getReviewsIsLoading = (state: State): boolean => state[NameSpace.Reviews].reviewsIsLoading;

export const getReviewsIsNotFound = (state: State): boolean => state[NameSpace.Reviews].reviewsIsNotFound;
