import { ApiRoute } from '@const';
import { Comment } from '@type/comment';
import { createAppAsyncThunk } from '@hooks/index';


type CommentProps = {
  body: {
    comment: string;
    rating: number;
  };
  offerId: string;
}

export const fetchCommentsAction = createAppAsyncThunk<Comment[], string>(
  'data/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Comment[]>(`${ApiRoute.Comments}/${offerId}`);
    return data;
  }
);

export const addCommentAction = createAppAsyncThunk<Comment, CommentProps>(
  'data/addComment',
  async ({offerId, body}, { extra: api }) => {
    const { data } = await api.post<Comment>(`${ApiRoute.Comments}/${offerId}`, body);
    return data;
  }
);
