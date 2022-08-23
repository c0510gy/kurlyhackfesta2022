import React from 'react';
import { observer } from 'mobx-react-lite';
import { Fulfillment } from '../../../../stores/event/type';
import { EventColumn, mappingPlaceholder } from '../../type';
import useStores from '../../../../hooks/useStores';
import SelectFilter from '../../../../components/ReusableElements/Select';
import { testOption } from '../../../../stores/event';
import styles from './index.module.scss';

const tableColumnByStep: { [key: string]: EventColumn[] } = {
  [Fulfillment.picking]: [
    EventColumn.id,
    EventColumn.worker_id,
    EventColumn.busket_id,
    EventColumn.product_id,
    EventColumn.weight,
    EventColumn.operation,
    // EventColumn.label,
    EventColumn.pred,
    EventColumn.created_at,
  ],
  [Fulfillment.packing]: [],
  [Fulfillment.delivery]: [],
};

const ListView: React.FunctionComponent = () => {
  const { eventStore } = useStores();

  if (!eventStore.fulfilmentStep) return;

  return (
    <div className={styles.listView}>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              {tableColumnByStep[eventStore.fulfilmentStep].map((col: EventColumn, index) => {
                return (
                  <th key={index}>
                    <SelectFilter placeholder={mappingPlaceholder[col]} col={col} options={testOption} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {eventStore.filterEvents.map((event, index) => {
              return (
                <tr key={index}>
                  {Object.entries(event).map(([key, value], index) => {
                    if (key === 'label') return;

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
