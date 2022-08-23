import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/ContentElements/Header';
import useStores from '../hooks/useStores';

const Layouts: React.FunctionComponent = () => {
  const { authStore } = useStores();
  /* TODO : Remove the below button  */
  const printT = (): void => {
    authStore.fetchTest();
  };

  return (
    <>
      <Header />
      <button onClick={printT}>token print</button>
      <Outlet />
    </>
  );
};

export default Layouts;
