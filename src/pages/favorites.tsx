import React from 'react';
import Header from '../components/header';
import { useAppSelector } from '../hooks';
import FavoritesEmpty from './favorites-empty';
import Spinner from '../components/spinner/spinner';
import { getFavorites, getFavoritesIsLoading, getFavoritesIsNotFound } from '../store/favorites-process/favorites-process.selectors';
import FavoriteCardList from '../components/favorite-card-list';

const Favorites: React.FC = () => {
  const favoriteCards = useAppSelector(getFavorites);
  const favoritesIsLoading = useAppSelector(getFavoritesIsLoading);
  const favoritesIsNotFound = useAppSelector(getFavoritesIsNotFound);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoritesIsLoading && <Spinner />}
          {(favoritesIsNotFound || !favoriteCards.length) ? (
            <FavoritesEmpty />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteCardList offerList={favoriteCards} />
            </section>
          )}
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

export default Favorites;
