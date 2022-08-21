import React from 'react';
import styles from './index.module.scss';

const Landing: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>{/* Simulator control button section */}</div>

      {/* Manual */}
      <h2>Manual</h2>
    </div>
  );
};

export default Landing;
