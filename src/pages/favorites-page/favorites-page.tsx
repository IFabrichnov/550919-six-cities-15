import { useAppSelector } from '@hooks/index';
import { favoritesSelectors } from '@store/slices/favorites';
import Container from '@components/container/container';
import FavoriteList from '@components/favorites-list/favorites-list';
import FavoritesEmpty from '@components/favorites-empty/favorites-empty';
import HelmetComponent from '@components/helmet-component/helmet-component';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(favoritesSelectors.selectFavoriteOffers);

  return (
    <Container isLoginNav classMain='page__main--favorites' extraClass={favoriteOffers.length === 0 ? 'page--favorites-empty' : ''}>
      <HelmetComponent
        title='6 cities: favorites'
        description="This page displays a user's favorite offers, providing easy access to preferred content."
      />
      {
        favoriteOffers?.length > 0 ? (
          <div className="page__favorites-container container" data-testid='favorites-page'>
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteList offers={favoriteOffers}/>
            </section>
          </div>
        ) : <FavoritesEmpty />
      }
    </Container>
  );
}

export default FavoritesPage;
