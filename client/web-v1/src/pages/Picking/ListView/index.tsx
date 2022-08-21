import React from 'react';
import { Fulfillment } from '../../../components/ContentElements/Header/type';
import { EventColumn } from '../type';
import useStores from '../../../hooks/useStores';
import SelectOption from '../../../components/ReusableElements/Select';
import styles from './index.module.scss';

const tableColumn: { [key: string]: EventColumn[] } = {
  [Fulfillment.Picking]: [
    EventColumn.BasketID,
    EventColumn.WorkerID,
    EventColumn.ProductID,
    EventColumn.Weight,
    EventColumn.Operation,
    EventColumn.Label,
    // EventColumn.Timestamp,
  ],
  [Fulfillment.Packing]: [],
  [Fulfillment.Delivery]: [],
};

/* TODO : get events from event store observerble */
const pickingEvents = [
  { worker_id: 0, busket_id: 1, product_id: 9, weight: 0.41740172538650305, operation: 'PUT', label: 'False' },
  { worker_id: 1, busket_id: 0, product_id: 2, weight: 0.4940190375572947, operation: 'PUT', label: 'False' },
  { worker_id: 2, busket_id: 1, product_id: 9, weight: 0.4969732191272813, operation: 'PUT', label: 'False' },
];

const ListView: React.FunctionComponent = () => {
  const { eventStore } = useStores();

  /* TODO : Replace temp options data with the real one */
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div className={styles.listView}>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              {tableColumn[eventStore.filterValues].map((col) => {
                return (
                  <th key={col}>
                    <SelectOption col={col} options={options} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {pickingEvents.map((event, index) => {
              return (
                <tr key={index}>
                  {Object.values(event).map((value, index) => {
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

export default ListView;
