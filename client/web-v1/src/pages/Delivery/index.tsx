import React from 'react';
import { Fulfillment } from '../../stores/event/type';
import styles from './index.module.scss';

const Delivery: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <h2>{Fulfillment.Delivery}</h2>
    </div>
  );
};

export default Delivery;
