import { RequestStatus } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { getToken } from '@services/token';
import { favoritesSelectors } from '@store/slices/favorites';
import { fetchFavoritesAction } from '@store/thunks/favorites';
import { useEffect } from 'react';

function useFavoritesCount() {
  const favoriteStatusRequest = useAppSelector(favoritesSelectors.selectFavoritesStatus);
  const count = useAppSelector(favoritesSelectors.selectFavoriteOffers).length;
  const token = getToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (favoriteStatusRequest === RequestStatus.Idle && token) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, favoriteStatusRequest, token]);

  return count;
}

export default useFavoritesCount;
