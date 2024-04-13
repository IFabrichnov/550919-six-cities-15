import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { authSelectors } from '@store/slices/auth';
import { logoutAction } from '@store/thunks/auth';
import Logo from '../logo/logo';
import { memo } from 'react';
import useFavoritesCount from '@hooks/use-favorites-count';

type THeaderProps = {
  isLoginNav: boolean;
}

function Header({ isLoginNav }: THeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector(authSelectors.selectAuthorizationStatus);
  const user = useAppSelector(authSelectors.selectUserData);
  const favoriteCount = useFavoritesCount();
  const dispatch = useAppDispatch();

  return (
    <header className="header" data-testid='header'>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {isLoginNav && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ?
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{user?.email}</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                        }}
                        to="#"
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </> :
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>}
              </ul>
            </nav>)}
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = memo(Header);
export default MemoizedHeader;
