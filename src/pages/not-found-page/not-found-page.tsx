import { Link } from 'react-router-dom';
import { AppRoute } from '@const';
import HelmetComponent from '@components/helmet-component/helmet-component';
import './not-found-page.css';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <HelmetComponent title='6 cities: 404 Not Found' description='6 cities: 404 Not Found'/>
      <h2>404 Not Found</h2>
      <Link to={AppRoute.Root}>Go to main page</Link>
    </div>
  );
}

export default NotFoundPage;
