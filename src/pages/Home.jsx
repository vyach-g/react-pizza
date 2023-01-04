import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState({
    name: 'популярности',
    sort: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);
    const catBy = categoryIndex > 0 ? `category=${categoryIndex}&` : '';
    const sortBy = `sortBy=${sortIndex.sort.replace('-', '')}&`;
    const orderBy = sortIndex.sort.includes('-') ? 'order=desc' : 'order=asc';
    fetch('https://63abe7eafdc006ba6068ad16.mockapi.io/items?' + catBy + sortBy + orderBy)
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });
  }, [categoryIndex, sortIndex]);

  const handleCategoryClick = (index) => {
    setCategoryIndex(index);
  };
  const handleSortClick = (index) => {
    setSortIndex(index);
  };

  return (
    <>
      <div className="content__top">
        <Categories categoryIndex={categoryIndex} handleCategoryClick={handleCategoryClick} />
        <Sort sortIndex={sortIndex} handleSortClick={handleSortClick} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? Array(6)
              .fill(null)
              .map((_, index) => <PizzaBlockSkeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.title} {...item} />)}
      </div>
    </>
  );
};

export default Home;
