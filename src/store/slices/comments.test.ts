import { RequestStatus } from '@const';
import { commentsSlice } from './comments';
import { addCommentAction, fetchCommentsAction } from '@store/thunks/comments';
import { makeFakeComment } from '@utils/mocks';

describe('Comment Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { comments: [], statusFetchComments: RequestStatus.Idle, statusAddComment: RequestStatus.Idle };

    const result = commentsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { comments: [], statusFetchComments: RequestStatus.Idle, statusAddComment: RequestStatus.Idle };

    const result = commentsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "fetchCommentsAction.pending" action', () => {
    const initialState = { comments: [], statusFetchComments: RequestStatus.Idle, statusAddComment: RequestStatus.Idle };
    const expectedState = { comments: [], statusFetchComments: RequestStatus.Loading, statusAddComment: RequestStatus.Idle };

    const result = commentsSlice.reducer(initialState, fetchCommentsAction.pending('offerId', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchCommentsAction.fulfilled" action', () => {
    const comments = [makeFakeComment()];
    const initialState = { comments: [], statusFetchComments: RequestStatus.Loading, statusAddComment: RequestStatus.Idle };
    const expectedState = { comments, statusFetchComments: RequestStatus.Success, statusAddComment: RequestStatus.Idle };

    const result = commentsSlice.reducer(initialState, fetchCommentsAction.fulfilled(comments, 'offerId', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "fetchCommentsAction.rejected" action', () => {
    const initialState = { comments: [], statusFetchComments: RequestStatus.Loading, statusAddComment: RequestStatus.Idle };
    const expectedState = { comments: [], statusFetchComments: RequestStatus.Failed, statusAddComment: RequestStatus.Idle };

    const result = commentsSlice.reducer(initialState, fetchCommentsAction.rejected(null, 'offerId', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "addCommentAction.pending" action', () => {
    const initialState = { comments: [], statusFetchComments: RequestStatus.Idle, statusAddComment: RequestStatus.Idle };
    const expectedState = { comments: [], statusFetchComments: RequestStatus.Idle, statusAddComment: RequestStatus.Loading };

    const result = commentsSlice.reducer(initialState, addCommentAction.pending('offerId', { offerId: 'offerId', body: { comment: 'test', rating: 5 } }));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "addCommentAction.fulfilled" action', () => {
    const comment = makeFakeComment();
    const initialState = { comments: [], statusFetchComments: RequestStatus.Idle, statusAddComment: RequestStatus.Loading };
    const expectedState = { comments: [comment], statusFetchComments: RequestStatus.Idle, statusAddComment: RequestStatus.Success };

    const result = commentsSlice.reducer(initialState, addCommentAction.fulfilled(comment, 'offerId', { offerId: 'offerId', body: { comment: 'test', rating: 5 } }));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "addCommentAction.rejected" action', () => {
    const initialState = { comments: [], statusFetchComments: RequestStatus.Idle, statusAddComment: RequestStatus.Loading };
    const expectedState = { comments: [], statusFetchComments: RequestStatus.Idle, statusAddComment: RequestStatus.Failed };

    const result = commentsSlice.reducer(initialState, addCommentAction.rejected(null, 'offerId', { offerId: 'offerId', body: { comment: 'test', rating: 5 } }));

    expect(result).toEqual(expectedState);
  });
});
