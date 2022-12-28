import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://63abe7eafdc006ba6068ad16.mockapi.io/items')
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
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
