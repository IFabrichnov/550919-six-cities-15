import { Location, Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '@const';
import { useAppSelector } from '@hooks/index';
import { authSelectors } from '@store/slices/auth';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

type TLocationState = {
  from?: Location;
}

function ProtectedRoute(props: TProtectedRouteProps): JSX.Element {
  const {onlyUnAuth, children} = props;
  const user = useAppSelector(authSelectors.selectUserData);
  const location: Location<TLocationState> = useLocation() as Location<TLocationState>;

  if (user && onlyUnAuth) {
    const from = location.state?.from || { pathname: AppRoute.Root };
    return <Navigate to={from} />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to={AppRoute.Login} state={{ from: location }}/>;
  }

  return children;
}

export default ProtectedRoute;
