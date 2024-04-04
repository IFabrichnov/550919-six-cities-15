import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import { getAuthorizationStatus } from '../store/user-process/user-process.selectors';
import { setFavoritesAction } from '../store/api-action';
import {AppRoutes,AuthorizationStatus,FavoritesUpdate,} from '../const';


export const useFavorites = (
  offerId: string,
  status: number,
  favoritesUpdate: FavoritesUpdate
) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  function onChangeFavorites() {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoutes.Login);
    }

    dispatch(setFavoritesAction({ offerId, status, favoritesUpdate }));
  }

  return onChangeFavorites;
};
