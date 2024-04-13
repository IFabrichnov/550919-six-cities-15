import classNames from 'classnames';
import { Link } from 'react-router-dom';

type TLocationProps = {
  location: string;
  isActive: boolean;
  onLocationChange: (location: string) => void;
}

function Location({ location, isActive, onLocationChange }: TLocationProps): JSX.Element {
  return (
    <li className="locations__item" data-testid='location-item'>
      <Link
        className={classNames('locations__item-link tabs__item', { 'tabs__item--active': isActive })}
        to="#"
        onClick={() => onLocationChange(location)}
      >
        <span>{location}</span>
      </Link>
    </li>
  );
}

export default Location;
