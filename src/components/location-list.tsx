import { useAppDispatch } from '../hooks/index';
import { setCityActive, setChangeMap, getOffers } from '../store/offers-process/offers-process.slice';
import { AppRoutes } from '../const';
import { Link } from 'react-router-dom';
import { citiesList } from '../const';

type LocationsListProps = {
  cityActive: string;
}

function LocationsList({ cityActive }: LocationsListProps): JSX.Element {
  const dispatch = useAppDispatch();

  function changeCity(city: string) {
    dispatch(setCityActive(city));
    dispatch(getOffers());
    dispatch(setChangeMap());
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesList.map((city) => {
            const keyValue = city;
            return (
              <li key={keyValue} className="locations__item">
                <Link className={`locations__item-link tabs__item ${city === cityActive ? 'tabs__item--active' : ''}`} onClick={() => changeCity(city)} to={AppRoutes.Main}>
                  <span>{city}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default LocationsList;

