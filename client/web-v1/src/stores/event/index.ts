import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import configs from '../../configs';
import useStores from '../../hooks/useStores';
import { Fulfillment } from '../../components/ContentElements/Header/type';
import { Option } from '../../components/ReusableElements/Select';
import { EventColumn, Event } from '../../pages/Picking/type';
import { FilterValue } from './type';

const option: Option = { label: '', value: '' };

export const initFilterValues: { [key: string]: { [key: string]: Option } } = {
  [Fulfillment.Picking]: {
    [EventColumn.BasketID]: undefined,
    [EventColumn.WorkerID]: undefined,
    [EventColumn.ProductID]: undefined,
    [EventColumn.Weight]: undefined,
    [EventColumn.Operation]: undefined,
    [EventColumn.Label]: undefined,
    [EventColumn.CreatedAt]: undefined,
  },
  [Fulfillment.Packing]: {
    [EventColumn.PackageID]: undefined,
    [EventColumn.FillingID]: undefined,
    [EventColumn.WorkerID]: undefined,
    [EventColumn.ProductID]: undefined,
    [EventColumn.Weight]: undefined,
    [EventColumn.Operation]: undefined,
    [EventColumn.Label]: undefined,
    [EventColumn.CreatedAt]: undefined,
  },
  [Fulfillment.Delivery]: {
    [EventColumn.PackageID]: undefined,
    [EventColumn.WorkerID]: undefined,
    [EventColumn.ProductID]: undefined,
    [EventColumn.Weight]: undefined,
    [EventColumn.Operation]: undefined,
    [EventColumn.Label]: undefined,
    [EventColumn.CreatedAt]: undefined,
  },
};

/* TODO : Replace temp options data with the real one */
export const testOption: readonly Option[] = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
];

const eventStore = function createEventStore() {
  return makeAutoObservable({
    fulfilmentStep: Fulfillment.Picking,

    /* TODO : the events has to be object like filterValues? */
    pickingEvents: [] as Event[],
    packingEvents: [] as Event[],
    deliveryEvents: [] as Event[],

    filterValues: {
      picking: initFilterValues[Fulfillment.Picking],
      packing: initFilterValues[Fulfillment.Packing],
      delivery: initFilterValues[Fulfillment.Delivery],
    } as { [key: string]: FilterValue },

    async loadEvents(): Promise<void> {
      const { authStore } = useStores();

      const getIdToken = await authStore.getIdToken();
      const { data } = await axios.get(`${configs.backendEndPoint}/api/events/picking`, {
        params: { limits: 100 },
        headers: { Authorization: `Bearer ${getIdToken}` },
      });

      this.pickingEvents = data.map((event: Event) => {
        return {
          [EventColumn.ID]: event.id,
          [EventColumn.BasketID]: event.busket_id,
          [EventColumn.WorkerID]: event.worker_id,
          [EventColumn.ProductID]: event.product_id,
          [EventColumn.Weight]: event.weight,
          [EventColumn.Operation]: event.operation,
          [EventColumn.Label]: event.label,
          [EventColumn.PRED]: event.pred,
          [EventColumn.CreatedAt]: event.created_at,
        };
      });

      // const packingEvents = '';
      // const deliveryEvents = '';
    },

    get filterEvents(): Array<Event> {
      const events = this.pickingEvents;
      const step = this.fulfilmentStep.toLowerCase();

      console.log('events', events);

      if (events.length === 0) return [];
      const filterValues = this.filterValues[step];

      let filteredEvents: Array<any> = [...events];

      Object.entries(filterValues).forEach(([col, option]: [any, Option]) => {
        if (!option) return true; // if value is undefined

        const aa = [{ [col]: option.value }]; // [ { '상품': 1 } ]

        filteredEvents = filteredEvents.filter((event) =>
          Object.entries(event).forEach((data) => {
            console.log('data', data);
          }),
        );
      });

      return filteredEvents;
    },

    updateFilterValueByKey(data: FilterValue): void {
      const filterValues = this.filterValues;
      const step = this.fulfilmentStep.toLowerCase();

      this.filterValues = { ...filterValues, [step]: { ...filterValues[step], ...data } };
    },
  });
};

export default eventStore;
