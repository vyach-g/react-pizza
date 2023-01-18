import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { SORT } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import Pagination from '../components/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizza } from '../redux/slices/pizzaSlice';

const Home = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  console.log(categoryId);

  useEffect(() => {
    // if (!isSearch.current) {
    getPizzas();
    // }
    // isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = SORT.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

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
  }, [categoryId, currentPage, sort]);

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
        currentPage,
      }),
    );
  };

  const handleCategoryClick = (id) => {
    dispatch(setCategoryId(id));
  };

  const handlePageClick = (index) => {
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
        <Sort />
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
