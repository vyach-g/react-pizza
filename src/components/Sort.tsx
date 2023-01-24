import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, Sort, SortPropertyEnum } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const SORT: SortItem[] = [
  { name: 'популярности+', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'популярности-', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'цене+', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'цене-', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'алфавиту+', sortProperty: SortPropertyEnum.TITLE_ASC },
  { name: 'алфавиту-', sortProperty: SortPropertyEnum.TITLE_DESC },
];

type SortPopupProps = {
  value: Sort;
};

const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const handleClick = (sortType: SortItem) => {
    dispatch(setSort(sortType));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event.composedPath);
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {SORT.map((obj, index) => (
              <li
                key={obj.sortProperty}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}
                onClick={() => handleClick(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
