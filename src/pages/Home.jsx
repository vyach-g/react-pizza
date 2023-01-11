import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import Pagination from '../components/Pagination/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(true);

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState({
    name: 'популярности',
    sort: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);
    const searchBy = searchValue ? `search=${searchValue}&` : '';
    const catBy = categoryIndex > 0 ? `category=${categoryIndex}&` : '';
    const sortBy = `sortBy=${sortIndex.sort.replace('-', '')}&`;
    const orderBy = sortIndex.sort.includes('-') ? 'order=desc' : 'order=asc';
    fetch(
      `https://63abe7eafdc006ba6068ad16.mockapi.io/items?page=${currentPage}&limit=4&` +
        searchBy +
        catBy +
        sortBy +
        orderBy,
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });
  }, [categoryIndex, sortIndex, searchValue, currentPage]);

  const handleCategoryClick = (index) => {
    setCategoryIndex(index);
  };
  const handleSortClick = (index) => {
    setSortIndex(index);
  };

  const pizzas = items.map((item) => <PizzaBlock key={item.title} {...item} />);

  const skeletons = Array(6)
    .fill(null)
    .map((_, index) => <PizzaBlockSkeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories categoryIndex={categoryIndex} handleCategoryClick={handleCategoryClick} />
        <Sort sortIndex={sortIndex} handleSortClick={handleSortClick} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
