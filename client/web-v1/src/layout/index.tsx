import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/ContentElements/Header';

const Layouts: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layouts;
