import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/ContentElements/Header';
import { Auth } from 'aws-amplify';
import { fetchTest } from '../utils/utility';
import useStores from '../hooks/useStores'


const Layouts: React.FunctionComponent = () => {
  const printT = (): void => {
    Auth.currentAuthenticatedUser().then((receivedUser) => {
      console.log(receivedUser.signInUserSession);
      console.log('idToken: ', receivedUser.signInUserSession.idToken.jwtToken);
      fetchTest();
    });
  };
  const { authStore } = useStores();
  const signOut = async () => {
    await Auth.signOut();
    authStore.removeToken();
  }
  return (
    <>
      <Header />
      <button onClick={printT}>token print</button>
      <button onClick={signOut}>Sign out!!!</button>
      <Outlet />
    </>
  );
};

export default Layouts;
