import React from 'react';
import { Outlet } from 'react-router-dom';
import {Auth} from "aws-amplify";

async function signOut() {
  try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

const printT = ():void => {
  Auth.currentAuthenticatedUser().then((receivedUser) => {
    console.log("Token: ", receivedUser.signInUserSession.accessToken.jwtToken)
  })
}

const Layouts = () => {
  return (
    <>
      <button onClick={printT}>token print</button>
      <button onClick={signOut}>Sign out!!!</button>
      <Outlet />
    </>
  );
};

export default Layouts;
