import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import configs from '../../configs';
import useStores from '../../hooks/useStores';
import { Option } from '../../components/ReusableElements/Select';
import { EventColumn, Event } from '../../pages/Picking/type';
import { FilterValue, Fulfillment, OptionInfo } from './type';

const option: Option = { label: '', value: '' };

export const initFilterValues: { [key: string]: { [key: string]: Option } } = {
  [Fulfillment.picking]: {
    [EventColumn.id]: undefined,
    [EventColumn.worker_id]: undefined,
    [EventColumn.product_id]: undefined,
    [EventColumn.weight]: undefined,
    [EventColumn.operation]: undefined,
    [EventColumn.pred]: undefined,
    // [EventColumn.Label]: undefined,
    [EventColumn.created_at]: undefined,
  },
  [Fulfillment.packing]: {
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
  [Fulfillment.delivery]: {
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
    fulfilmentStep: Fulfillment.picking as Fulfillment,

    /* TODO : the events has to be object like filterValues? */
    pickingEvents: [] as Array<Event>,
    packingEvents: [] as Array<Event>,
    deliveryEvents: [] as Array<Event>,
    optionInfo: {
      picking: {} as OptionInfo,
      packing: {} as OptionInfo,
      delivery: {} as OptionInfo,
    },

    filterValues: {
      picking: initFilterValues[Fulfillment.picking],
      packing: initFilterValues[Fulfillment.packing],
      delivery: initFilterValues[Fulfillment.delivery],
    } as { [key: string]: FilterValue },

    get filterEvents(): Array<Event> {
      const events = this.pickingEvents;
      const step = this.fulfilmentStep;

      if (events.length === 0) return [];
      const filterValues = this.filterValues[step];

      let filteredEvents: Array<Event> = [...events];

      filteredEvents.filter((event: any) =>
        Object.entries(filterValues)
          .filter(([, option]) => !!option)
          .reduce((prev, [col, option]) => prev && event[col] == option, true),
      );

      return filteredEvents;
    },

    async loadEvents(): Promise<void> {
      const { authStore } = useStores();
      const step = this.fulfilmentStep;

      try {
        const getIdToken = await authStore.getIdToken();

        const { data } = await axios.get(`${configs.backendEndPoint}/api/events/${step}`, {
          params: { limits: 100 },
          headers: { Authorization: `Bearer ${getIdToken}` },
        });

        runInAction(() => {
          this.pickingEvents = data;
        });
      } catch (error) {
        throw error;
      }

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

    updateFilterValueByKey(data: FilterValue): void {
      const filterValues = this.filterValues;
      const step = this.fulfilmentStep;

      this.filterValues = { ...filterValues, [step]: { ...filterValues[step], ...data } };
    },

    updateFulfilmentStep(step: Fulfillment): void {
      this.fulfilmentStep = step;
    },
  });
};

export default eventStore;
