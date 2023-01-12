import React, { useState, useEffect, useContext } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  console.log(categoryId);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const searchBy = searchValue ? `search=${searchValue}&` : '';
    const catBy = categoryId > 0 ? `category=${categoryId}&` : '';

    const sortBy = `sortBy=${sort.sort.replace('-', '')}&`;
    const orderBy = sort.sort.includes('-') ? 'order=desc' : 'order=asc';
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
  }, [categoryId, sort, searchValue, currentPage]);

  const handleCategoryClick = (id) => {
    dispatch(setCategoryId(id));
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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
