import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import configs from '../../configs';
import useStores from '../../hooks/useStores';
import { Option } from '../../components/ReusableElements/Select';
import { EventColumn, Event } from '../../pages/Picking/type';
import { FilterValue, Fulfillment } from './type';

const option: Option = { label: '', value: '' };

export const initFilterValues: { [key: string]: { [key: string]: Option } } = {
  [Fulfillment.Picking]: {
    [EventColumn.id]: undefined,
    [EventColumn.worker_id]: undefined,
    [EventColumn.product_id]: undefined,
    [EventColumn.weight]: undefined,
    [EventColumn.operation]: undefined,
    [EventColumn.pred]: undefined,
    // [EventColumn.Label]: undefined,
    [EventColumn.created_at]: undefined,
  },
  [Fulfillment.Packing]: {
    [EventColumn.package_id]: undefined,
    [EventColumn.filling_id]: undefined,
    [EventColumn.worker_id]: undefined,
    [EventColumn.product_id]: undefined,
    [EventColumn.weight]: undefined,
    [EventColumn.operation]: undefined,
    [EventColumn.pred]: undefined,
    // [EventColumn.Label]: undefined,
    [EventColumn.created_at]: undefined,
  },
  [Fulfillment.Delivery]: {
    [EventColumn.package_id]: undefined,
    [EventColumn.worker_id]: undefined,
    [EventColumn.product_id]: undefined,
    [EventColumn.weight]: undefined,
    [EventColumn.operation]: undefined,
    [EventColumn.pred]: undefined,
    // [EventColumn.Label]: undefined,
    [EventColumn.created_at]: undefined,
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
    pickingEvents: [] as Array<Event>,
    packingEvents: [] as Array<Event>,
    deliveryEvents: [] as Array<Event>,

    filterValues: {
      picking: initFilterValues[Fulfillment.Picking],
      packing: initFilterValues[Fulfillment.Packing],
      delivery: initFilterValues[Fulfillment.Delivery],
    } as { [key: string]: FilterValue },

    async loadEvents(step: Fulfillment): Promise<void> {
      const { authStore } = useStores();

      const getIdToken = await authStore.getIdToken();

      const { data } = await axios.get(`${configs.backendEndPoint}/api/events/${step.toLowerCase()}`, {
        params: { limits: 100 },
        headers: { Authorization: `Bearer ${getIdToken}` },
      });

      this.pickingEvents = data;
      // .map((event: Event) => {
      //   return {
      //     [EventColumn.ID]: event.id,
      //     [EventColumn.BasketID]: event.busket_id,
      //     [EventColumn.WorkerID]: event.worker_id,
      //     [EventColumn.ProductID]: event.product_id,
      //     [EventColumn.Weight]: event.weight,
      //     [EventColumn.Operation]: event.operation,
      //     [EventColumn.Label]: event.label,
      //     [EventColumn.Pred]: event.pred,
      //     [EventColumn.CreatedAt]: event.created_at,
      //   };
      // });

      // const packingEvents = '';
      // const deliveryEvents = '';
    },

    get filterEvents(): Array<Event> {
      const events = this.pickingEvents;
      const step = this.fulfilmentStep.toLowerCase();

      if (events.length === 0) return [];
      const filterValues = this.filterValues[step];

      let filteredEvents: Array<Event> = [...events];

      console.log(filterValues);

      filteredEvents.filter((event: any) =>
        Object.entries(filterValues)
          .filter(([, option]: [string, string]) => !!option)
          .reduce((prev, [col, option]) => prev && event[col] == option, true),
      );

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
