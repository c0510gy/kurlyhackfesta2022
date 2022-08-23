import React from 'react';
import { observer } from 'mobx-react-lite';
import { Fulfillment } from '../../../../stores/event/type';
import { EventColumn, mappingPlaceholder } from '../../type';
import useStores from '../../../../hooks/useStores';
import SelectFilter, { Option } from '../../../../components/ReusableElements/Select';
import styles from './index.module.scss';
import moment from 'moment';

const tableColumnByStep: { [key: string]: EventColumn[] } = {
  [Fulfillment.picking]: [
    EventColumn.id,
    EventColumn.worker_id,
    EventColumn.busket_id,
    EventColumn.product_id,
    EventColumn.weight,
    EventColumn.operation,
    EventColumn.pred,
    EventColumn.created_at,
  ],
  [Fulfillment.packing]: [
    EventColumn.id,
    EventColumn.worker_id,
    EventColumn.package_id,
    EventColumn.filling_id,
    EventColumn.weight,
    EventColumn.operation,
    EventColumn.pred,
    EventColumn.created_at,
  ],
  [Fulfillment.delivery]: [
    EventColumn.id,
    EventColumn.worker_id,
    EventColumn.package_id,
    EventColumn.region_id,
    EventColumn.weight,
    EventColumn.operation,
    EventColumn.pred,
    EventColumn.created_at,
  ],
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
                    <SelectFilter
                      placeholder={mappingPlaceholder[col]}
                      col={col}
                      options={eventStore.options[eventStore.fulfilmentStep as Fulfillment][col] as Option[]}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {eventStore.filterEvents.map((event, index) => {
              return (
                <tr key={index}>
                  {Object.entries(event).map(([key, value]: [string, string | number | boolean], index) => {
                    let dataValue = value;
                    let colorByStatus: React.CSSProperties = null;
                    if (key === EventColumn.label) return;
                    if (key === EventColumn.pred) dataValue = value ? 'True' : 'False';
                    if (key === EventColumn.created_at)
                      dataValue = moment(value as string)
                        .locale('ko')
                        .format('YYYY-MM-DD HH:mm:ss') as string;

                    return (
                      <td style={colorByStatus} key={index}>
                        {dataValue}
                      </td>
                    );
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
