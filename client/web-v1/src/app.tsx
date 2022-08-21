import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layouts from './layout';
import Landing from './pages/Landing';
import { Amplify } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import awsconfig from "./awsconfig.js";

Amplify.configure(awsconfig);

const App = (): JSX.Element => {
  return (
    <AmplifyAuthenticator>
      <AmplifySignIn
        slot="sign-in"
        headerText="Gravimetric Dashboard Sign In"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div slot="secondary-footer-content"></div> {/* 회원가입 버튼 안보이게 */}
      </AmplifySignIn>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Landing />} />
        </Route>
      </Routes>
    </AmplifyAuthenticator>
  );
};

export default App;
