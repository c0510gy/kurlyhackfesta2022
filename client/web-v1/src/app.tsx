import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layouts from './layout';
import Landing from './pages/Landing';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Landing />} />
      </Route>
    </Routes>
  );
};

export default App;
