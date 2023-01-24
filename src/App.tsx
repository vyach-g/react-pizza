import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
// import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              {' '}
              <Cart />{' '}
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
