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

const Layouts = () => {
  return (
    <>
      <button onClick={signOut}>Sign out!!!</button>
      <Outlet />
    </>
  );
};

export default Layouts;
