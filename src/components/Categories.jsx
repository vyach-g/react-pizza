import React, { useState } from 'react';

const CATEGORIES = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((category, index) => (
          <li
            key={category}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => setActiveIndex(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
