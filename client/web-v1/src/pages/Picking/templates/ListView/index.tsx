import React from 'react';
import { observer } from 'mobx-react-lite';
import { Fulfillment } from '../../../../components/ContentElements/Header/type';
import { EventColumn } from '../../type';
import useStores from '../../../../hooks/useStores';
import SelectFilter from '../../../../components/ReusableElements/Select';
import { testOption } from '../../../../stores/event';
import styles from './index.module.scss';

const tableColumnByStep: { [key: string]: EventColumn[] } = {
  [Fulfillment.Picking]: [
    EventColumn.ID,
    EventColumn.BasketID,
    EventColumn.WorkerID,
    EventColumn.ProductID,
    EventColumn.Weight,
    EventColumn.Operation,
    EventColumn.Label,
    EventColumn.CreatedAt,
  ],
  [Fulfillment.Packing]: [],
  [Fulfillment.Delivery]: [],
};

const ListView: React.FunctionComponent = () => {
  const { eventStore } = useStores();

  return (
    <div className={styles.listView}>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              {tableColumnByStep[eventStore.fulfilmentStep].map((col, index) => {
                return (
                  <th key={index}>
                    <SelectFilter col={col} options={testOption} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {eventStore.filterEvents.map((event, index) => {
              return (
                <tr key={index}>
                  {Object.values(event).map((value: any, index) => {
                    return <td key={index}>{value}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default observer(ListView);
