import '../src/scss/global.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layouts from './layout';
import Landing from './pages/Landing';
import Picking from './pages/Picking';
import Packing from './pages/Packing';
import Delivery from './pages/Delivery';

import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import configs from './configs';


Amplify.configure(configs.awsConfig);

const App = (): JSX.Element => {
  return (
    <AmplifyAuthenticator>
      <AmplifySignIn
        slot="sign-in"
        headerText="Gravimetric Dashboard Sign In"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div slot="secondary-footer-content"></div> {/* 회원가입 버튼 안보이게 */}
      </AmplifySignIn>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Landing />} />
          <Route path="picking" element={<Picking />} />
          <Route path="packing" element={<Packing />} />
          <Route path="delivery" element={<Delivery />} />
        </Route>
      </Routes>
    </AmplifyAuthenticator>
  );
};

export default App;
