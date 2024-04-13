import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '@type/comment';
import { RequestStatus } from '@const';
import { addCommentAction, fetchCommentsAction } from '@store/thunks/comments';

type CommentState = {
  comments: Comment[];
  statusFetchComments: RequestStatus;
  statusAddComment: RequestStatus;
}

const initialState: CommentState = {
  comments: [],
  statusFetchComments: RequestStatus.Idle,
  statusAddComment: RequestStatus.Idle,
};

const commentsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.statusFetchComments = RequestStatus.Success;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.statusFetchComments = RequestStatus.Loading;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.statusFetchComments = RequestStatus.Failed;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.statusAddComment = RequestStatus.Success;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.statusAddComment = RequestStatus.Failed;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.statusAddComment = RequestStatus.Loading;
      }),
  initialState,
  name: 'comments',
  reducers: {},
  selectors: {
    selectComments: (state: CommentState) => state.comments,
    selectFetchCommentsStatus: (state: CommentState) => state.statusFetchComments,
    selectAddCommentStatus: (state: CommentState) => state.statusAddComment,
  }
});

const commentsActions = { ...commentsSlice.actions, fetchCommentsAction, addCommentAction };
const commentsSelectors = {...commentsSlice.selectors};

export { commentsActions, commentsSlice, commentsSelectors };
