import React from 'react';
import { Fulfillment } from '../../../stores/event/type';
import ListView from '../../Picking/templates/ListView';
import styles from './index.module.scss';

const DeliveryTemplate: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <h2>{Fulfillment.delivery}</h2>
      <section>
        <ListView />
      </section>
    </div>
  );
};

export default DeliveryTemplate;
