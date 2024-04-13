import { useMemo } from 'react';
import { useAppDispatch } from '@hooks/index';
import { Link } from 'react-router-dom';
import { AppRoute, LOCATIONS } from '@const';
import { offersActions } from '@store/slices/offers';
import { getRandomLocation } from '@utils/common';
import Container from '@components/container/container';
import LoginForm from '@components/login-form/login-form';
import HelmetComponent from '@components/helmet-component/helmet-component';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const randomLocation = useMemo(() => getRandomLocation(LOCATIONS), []);

  return (
    <Container isLoginNav={false} extraClass='page--gray page--login' classMain='page__main--login'>
      <HelmetComponent
        title='6 cities: authorization'
        description='This page is the authentication gateway, allowing users to log in and access the features.'
      />
      <div className="page__login-container container">
        <section className="login" data-testid='login-section'>
          <h1 className="login__title">Sign in</h1>
          <LoginForm />
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={AppRoute.Root} onClick={() => dispatch(offersActions.setLocation(randomLocation))}>
              <span>{randomLocation}</span>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default LoginPage;
