import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { EventView } from '../type';
import { Fulfillment } from '../../../stores/event/type';
import Button from '../../../components/ReusableElements/Button';
import ListView from './ListView';
import BasketView from './BasketView';
import styles from './index.module.scss';

const PickingTemplate: React.FunctionComponent = () => {
  const [selectedView, setSelectedView] = useState(EventView.ListView);
  const viewContent: { [key: string]: JSX.Element } = {
    [EventView.ListView]: <ListView />,
    [EventView.BasketView]: <BasketView />,
  };

  return (
    <div className={styles.container}>
      <h2>{Fulfillment.picking}</h2>
      <div className={styles.btnWrapper}>
        {Object.entries(EventView).map((view) => {
          const [key, value] = view;
          return (
            <Button
              key={key} /* TODO : use uuid for key */
              className={selectedView === value ? styles.selectedBtn : styles.button}
              type={'button'}
              clickHandler={(): void => setSelectedView(value)}
            >
              {value}
            </Button>
          );
        })}
      </div>

      <section>{viewContent[selectedView]}</section>
    </div>
  );
};

export default observer(PickingTemplate);
