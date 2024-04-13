import { useCallback, useMemo, useState } from 'react';
import { Offer } from '@type/offer';
import { LOCATIONS, RequestStatus, SortTypeOption } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { offersActions, offersSelectors } from '@store/slices/offers';
import { sortOfferByType } from '@utils/sortType';
import Loader from '@components/loader/loader';
import MemoizedSort from '@components/sort/sort';
import Location from '@components/location/location';
import MainEmpty from '@components/main-empty/main-empty';
import MemoizedListOffers from '@components/list-offers/list-offers';
import MemorizedMap from '@components/map/map';
import Container from '@components/container/container';
import HelmetComponent from '@components/helmet-component/helmet-component';
import { pluralize } from '@utils/common';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeLocation = useAppSelector(offersSelectors.selectLocation);
  const selectedOffers = useAppSelector(offersSelectors.selectOffersByLocation);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [activeSortType, setActiveSortType] = useState(SortTypeOption.Popular);
  const offersStatusRequest = useAppSelector(offersSelectors.selectStatus);

  const handleLocationChange = useCallback((location: string) => {
    dispatch(offersActions.setLocation(location));
  }, [dispatch]);

  const sortedOffers = useMemo(() => sortOfferByType({activeSortType, selectedOffers}), [activeSortType, selectedOffers]);

  if (offersStatusRequest === RequestStatus.Loading) {
    return (
      <Loader />
    );
  }

  return (
    <Container
      isLoginNav
      extraClass='page--gray page--main'
      classMain='page__main--index'
      emptyClass={sortedOffers.length === 0 ? 'page__main--index-empty' : ''}
    >
      <HelmetComponent title='6 cities' description='This page showcases various offers available on the platform.'/>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs" data-testid='main-tabs'>
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {LOCATIONS.map((location) => (
              <Location
                key={location}
                location={location}
                isActive={location === activeLocation}
                onLocationChange={() => handleLocationChange(location)}
              />
            ))}
          </ul>
        </section>
      </div>
      {sortedOffers.length === 0 ? <MainEmpty /> :
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {`${pluralize(sortedOffers.length, 'place', 'places')} to stay in ${activeLocation}`}
              </b>
              <MemoizedSort currentType={activeSortType} setter={setActiveSortType} />
              <MemoizedListOffers
                offers={sortedOffers}
                onOfferHover={setSelectedOffer}
                listBlock='cities__places-list'
                extraClass='tabs__content'
                block='cities'
              />
            </section>
            <div className="cities__right-section">
              <MemorizedMap extraClass='cities' city={sortedOffers[0].city} offers={sortedOffers} selectedOfferId={selectedOffer?.id}/>
            </div>
          </div>
        </div>}
    </Container>
  );
}

export default MainPage;
