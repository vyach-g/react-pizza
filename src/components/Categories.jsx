import React, { useState } from 'react';

const CATEGORIES = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = ({ categoryIndex, handleCategoryClick }) => {
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((category, index) => (
          <li
            key={category}
            className={categoryIndex === index ? 'active' : ''}
            onClick={() => handleCategoryClick(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
