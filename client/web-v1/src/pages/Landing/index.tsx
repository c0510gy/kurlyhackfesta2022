import React, { useEffect } from 'react';
import styles from './index.module.scss';
import useStores from '../../hooks/useStores';

const Landing: React.FunctionComponent = (): JSX.Element => {
  const { authStore } = useStores();
  useEffect(() => {
    authStore.updateToken("hi");
  }, [])

  const bb = () => {
    console.log(authStore.idToken)
  }
  return (
    <div className={styles.container}>
      <div>{/* Simulator control button section */}</div>
      <button onClick={bb}>adsadasdsa</button>
      {/* Manual */}
      <h2>Manual</h2>
    </div>
  );
};

export default Landing;
