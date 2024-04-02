import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewsProcess } from '../../types/state';
import { fetchReviewsAction, submitCommentAction } from '../api-action';

const initialState: ReviewsProcess = {
  reviews: [],
  reviewsIsLoading: false,
  reviewsIsNotFound: false
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsIsLoading = true;
        state.reviewsIsNotFound = false;
      })

      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        const reviewsData = action.payload;

        if (reviewsData.length > 0) {
          state.reviews = reviewsData;
        }

        state.reviewsIsLoading = false;
      })

      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsIsLoading = false;
        state.reviewsIsNotFound = true;
      })

      .addCase(submitCommentAction.fulfilled, (state, action) => {
        const newReview = action.payload;

        state.reviews.push(newReview);
      });
  },
});
