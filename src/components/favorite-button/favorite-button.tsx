import { AppRoute, RequestStatus } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { getToken } from '@services/token';
import { favoritesSelectors } from '@store/slices/favorites';
import { offerActions } from '@store/slices/offer';
import { offersActions } from '@store/slices/offers';
import { changeFavoriteAction } from '@store/thunks/favorites';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type TFavoriteButtonProps = {
  extraClass?: 'offer' | 'place-card';
  isFavorite?: boolean;
  offerId: string;
  width?: number;
  height?: number;
}

function FavoriteButton({ extraClass = 'place-card', isFavorite = false, offerId, width = 18, height = 19 }: TFavoriteButtonProps): JSX.Element {
  const token = getToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoriteStatusRequest = useAppSelector(favoritesSelectors.selectFavoritesStatus);
  const bookmarksLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;
  const buttonClass = `${extraClass}__bookmark-button`;

  const handleFavoriteChange = () => {
    if (!token) {
      return navigate(AppRoute.Login);
    }

    dispatch(changeFavoriteAction({offerId, status: Number(!isFavorite)}));

    if (favoriteStatusRequest !== RequestStatus.Failed) {
      dispatch(offersActions.updateOffers(offerId));
      dispatch(offerActions.updateOffer(offerId));
    }
  };

  return (
    <button
      className={classNames(buttonClass, 'button', {[`${buttonClass}--active`]: isFavorite})}
      type="button"
      onClick={handleFavoriteChange}
      data-testid='favorite-button'
    >
      <svg className={`${extraClass}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{bookmarksLabel}</span>
    </button>
  );
}

export default FavoriteButton;
