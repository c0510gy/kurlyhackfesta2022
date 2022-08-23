import React from 'react';
import { Fulfillment } from '../../../stores/event/type';
import styles from './index.module.scss';

const PackingTemplate: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <h2>{Fulfillment.packing}</h2>
    </div>
  );
};

export default PackingTemplate;
