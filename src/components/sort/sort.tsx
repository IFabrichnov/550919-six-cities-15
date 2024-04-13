import { memo, useEffect } from 'react';
import classNames from 'classnames';
import { SORT_TYPES, SortTypeOption } from '@const';
import useBoolean from '@hooks/use-boolean';

type TSortProps = {
  currentType: SortTypeOption;
  setter: (option: SortTypeOption) => void;
}

function Sort({ currentType, setter }: TSortProps): JSX.Element {
  const { isOn, off, toggle } = useBoolean(false);

  const activeSortType = SORT_TYPES[currentType];

  useEffect(() => {
    if (isOn) {
      const onEscKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          off();
        }
      };

      document.addEventListener('keydown', onEscKeyDown);

      return () => {
        document.removeEventListener('keydown', onEscKeyDown);
      };
    }
  }, [isOn, off]);

  return (
    <form className="places__sorting" action="#" method="get" onClick={toggle} data-testid='sort'>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', isOn && 'places__options--opened')}>
        {
          SORT_TYPES.map((type, index) => (
            <li
              key={type}
              className={classNames('places__option', { 'places__option--active': activeSortType === type })}
              tabIndex={0}
              onClick={() => setter(index)}
            >
              {type}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

const MemoizedSort = memo(Sort);
export default MemoizedSort;
