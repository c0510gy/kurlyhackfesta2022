import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layouts from './layout';
import Landing from './pages/Landing';
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "./awsconfig.js";

Amplify.configure(awsconfig);

const App = (): JSX.Element => {
  return (
    <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Landing />} />
        </Route>
    </Routes>
  );
};

export default withAuthenticator(App);
