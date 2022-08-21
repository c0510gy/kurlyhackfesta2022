import React from 'react';
import { Outlet } from 'react-router-dom';
import {Auth} from "aws-amplify";
import {fetchTest} from '../utils/utility'

async function signOut() {
  try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

const printT = ():void => {
  Auth.currentAuthenticatedUser().then((receivedUser) => {
    console.log(receivedUser.signInUserSession)
    console.log("idToken: ", receivedUser.signInUserSession.idToken.jwtToken)
    fetchTest()
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
