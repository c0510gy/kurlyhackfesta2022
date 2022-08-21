import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/ContentElements/Header';
import { Auth } from 'aws-amplify';
import { fetchTest } from '../utils/utility';

const Layouts: React.FunctionComponent = () => {
  /* TODO : Remove the below button  */
  const printT = (): void => {
    Auth.currentAuthenticatedUser().then((receivedUser) => {
      console.log(receivedUser.signInUserSession);
      console.log('idToken: ', receivedUser.signInUserSession.idToken.jwtToken);
      fetchTest();
    });
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
