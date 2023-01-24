import React from 'react';

const CATEGORIES = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

interface CategoriesProps {
  categoryIndex: number;
  handleCategoryClick: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryIndex, handleCategoryClick }) => {
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
  },
);

export default Categories;
