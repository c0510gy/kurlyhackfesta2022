import React from 'react';
import { Fulfillment } from '../../stores/event/type';
import styles from './index.module.scss';

const Packing: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <h2>{Fulfillment.Packing}</h2>
    </div>
  );
};

export default Packing;
