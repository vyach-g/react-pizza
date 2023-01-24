import React, { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { SORT } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import Pagination from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import {
  FilterSliceState,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizza, SearchPizzaParams } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  console.log(categoryId);

  useEffect(() => {
    const getPizzas = async () => {
      const searchBy = searchValue ? `search=${searchValue}&` : '';
      const catBy = categoryId > 0 ? `category=${categoryId}&` : '';
      const sortBy = `sortBy=${sort.sortProperty.replace('-', '')}&`;
      const orderBy = sort.sortProperty.includes('-') ? 'order=desc' : 'order=asc';

      dispatch(
        fetchPizza({
          searchBy,
          catBy,
          sortBy,
          orderBy,
          currentPage: String(currentPage),
        }),
      );
    };
    // if (!isSearch.current) {
    getPizzas();
    // }
    // isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage, dispatch]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = SORT.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.searchBy,
          categoryId: Number(params.catBy),
          currentPage: Number(params.currentPage),
          sort: sort || SORT[0],
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, navigate, sort]);

  const handleCategoryClick = useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const handlePageClick = (index: number) => {
    dispatch(setCurrentPage(index));
  };

  // const handleSortClick = (index) => {
  //   setSortIndex(index);
  // };

  const pizzas = items.map((item) => <PizzaBlock key={item.title} {...item} />);

  const skeletons = Array(6)
    .fill(null)
    .map((_, index) => <PizzaBlockSkeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories categoryIndex={categoryId} handleCategoryClick={handleCategoryClick} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить питсы. Попробуйте попробовать позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onPageChange={(number) => handlePageClick(number)} />
    </>
  );
};

export default Home;
