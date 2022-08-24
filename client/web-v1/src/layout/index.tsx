import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/ContentElements/Header';
import useStores from '../hooks/useStores';

const Layouts: React.FunctionComponent = () => {
  const { authStore } = useStores();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layouts;
