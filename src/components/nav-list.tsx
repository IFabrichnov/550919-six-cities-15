import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/index';
import { AuthorizationStatus, AppRoutes, PRIVATE_ROUTES } from '../const';
import { logoutAction, fetchFavoritesAction } from '../store/api-action';
import { getAuthorizationStatus, getUser } from '../store/user-process/user-process.selectors';
import { getFavorites } from '../store/favorites-process/favorites-process.selectors';

function NavList(): JSX.Element {
  const authorizationStatusLogged = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLogged = authorizationStatusLogged === AuthorizationStatus.Auth;

  const favorites = useAppSelector(getFavorites);
  const favoritesLength = favorites.length;

  useEffect(() => {
    if (isLogged && favoritesLength === 0) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, isLogged, favoritesLength]);

  const handleClick = () => {
    dispatch(logoutAction());

    if (PRIVATE_ROUTES.includes(pathname)) {
      navigate(AppRoutes.Main);
    }
  };

  return (
    <nav className="header__nav">
      {isLogged ? (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <NavLink
              className="header__nav-link header__nav-link--profile"
              to={AppRoutes.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {user?.email}
              </span>
              <span className="header__favorite-count">{favoritesLength}</span>
            </NavLink>
          </li>
          <li className="header__nav-link resetStyleButton">
            <button className="header__nav-link" onClick={handleClick}>
              <span className="header__signout">Sign out</span>
            </button>
          </li>
        </ul>
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoutes.Login}
              state={{ from: pathname }}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavList;
