import '../src/scss/global.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layouts from './layout';
import Landing from './pages/Landing';
import Picking from './pages/Picking';
import Packing from './pages/Packing';
import Delivery from './pages/Delivery';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Landing />} />
        <Route path="picking" element={<Picking />} />
        <Route path="packing" element={<Packing />} />
        <Route path="delivery" element={<Delivery />} />
      </Route>
    </Routes>
  );
};

export default App;
