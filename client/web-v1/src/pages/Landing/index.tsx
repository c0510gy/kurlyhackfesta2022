import React, { useEffect } from 'react';
import styles from './index.module.scss';
import useStores from '../../hooks/useStores';
import { Auth } from 'aws-amplify';

const Landing: React.FunctionComponent = (): JSX.Element => {
  const { authStore } = useStores();
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      const idToken = user.signInUserSession.idToken.jwtToken;
      const accessToken = user.signInUserSession.accessToken.jwtToken;
      const name = user.attributes.nickname;
      authStore.updateToken(idToken, accessToken, name);
    })
  }, [])

  return (
    <div className={styles.container}>
      <div>{/* Simulator control button section */}</div>
      {/* Manual */}
      <h2>Manual</h2>
    </div>
  );
};

export default Landing;
