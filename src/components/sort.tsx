import { useState } from 'react';
import { getSortType, setSortOffers } from '../store/action';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import { SortType } from '../const';

const Sort: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const selectedSortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  function handleToggle() {
    setOpen(!open);
  }

  function handleChangeSorting(item: SortType) {
    dispatch(getSortType(item));
    dispatch(setSortOffers());
    setOpen(false);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {selectedSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${open ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((sortItem) => (
          <li
            className={`places__option ${selectedSortType === sortItem ? 'places__option--active' : ''}`}
            key={sortItem}
            tabIndex={0}
            onClick={() => handleChangeSorting(sortItem)}
          >
            {sortItem}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Sort;
