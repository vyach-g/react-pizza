import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaBlockSkeleton: React.FC = (props) => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <circle cx="140" cy="132" r="120" />
      <rect x="0" y="267" rx="10" ry="10" width="280" height="27" />
      <rect x="0" y="316" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="420" rx="10" ry="10" width="96" height="40" />
      <rect x="125" y="420" rx="20" ry="20" width="152" height="40" />
    </ContentLoader>
  );
};

export default PizzaBlockSkeleton;
