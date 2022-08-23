import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import configs from '../../configs';
import moment from 'moment';
import useStores from '../../hooks/useStores';
import { Option } from '../../components/ReusableElements/Select';
import { EventColumn, Event } from '../../pages/Picking/type';
import { FilterValue, Fulfillment } from './type';
import { list } from 'postcss';

export const initFilterValues: { [key: string]: { [key: string]: Option | Option[] } } = {
  [Fulfillment.picking]: {
    [EventColumn.id]: undefined,
    [EventColumn.worker_id]: undefined,
    [EventColumn.busket_id]: undefined,
    [EventColumn.product_id]: undefined,
    [EventColumn.weight]: undefined,
    [EventColumn.operation]: undefined,
    [EventColumn.pred]: undefined,
    [EventColumn.created_at]: undefined,
  },
  [Fulfillment.packing]: {
    [EventColumn.id]: undefined,
    [EventColumn.worker_id]: undefined,
    [EventColumn.package_id]: undefined,
    [EventColumn.filling_id]: undefined,
    [EventColumn.weight]: undefined,
    [EventColumn.operation]: undefined,
    [EventColumn.pred]: undefined,
    [EventColumn.created_at]: undefined,
  },
  [Fulfillment.delivery]: {
    [EventColumn.id]: undefined,
    [EventColumn.worker_id]: undefined,
    [EventColumn.package_id]: undefined,
    [EventColumn.region_id]: undefined,
    [EventColumn.weight]: undefined,
    [EventColumn.operation]: undefined,
    [EventColumn.pred]: undefined,
    [EventColumn.created_at]: undefined,
  },
};

const eventStore = function createEventStore() {
  return makeAutoObservable({
    fulfilmentStep: undefined,

    events: {
      picking: [] as Event[],
      packing: [] as Event[],
      delivery: [] as Event[],
      busket: [] as Event[],
    },

    options: {
      picking: initFilterValues[Fulfillment.picking],
      packing: initFilterValues[Fulfillment.packing],
      delivery: initFilterValues[Fulfillment.delivery],
    },

    filterValues: {
      picking: initFilterValues[Fulfillment.picking],
      packing: initFilterValues[Fulfillment.packing],
      delivery: initFilterValues[Fulfillment.delivery],
    } as { [key: string]: FilterValue },

    get filterEvents(): Event[] {
      let events: Event[] = [];
      const step = this.fulfilmentStep;

      events = this.events[step];

      if (events.length === 0) return [];
      const filterValues = this.filterValues[step];

      let filteredEvents: Array<Event> = [...events];

      filteredEvents = filteredEvents.filter((event: Event) =>
        Object.entries(filterValues)
          .filter(([, option]) => !!option)
          .reduce((prev, [col, option]: [EventColumn, Option]) => {
            return prev && event[col] == option.value;
          }, true),
      );

      return filteredEvents;
    },

    async loadEvents(): Promise<void> {
      const { authStore } = useStores();
      const step = this.fulfilmentStep;

      if (!step) return;

      try {
        const getIdToken = await authStore.getIdToken();

        const { data: optionsInfo } = await axios.get(`${configs.backendEndPoint}/api/info/${step}`, {
          params: {},
          headers: { Authorization: `Bearer ${getIdToken}` },
        });

        const { data: events } = await axios.get(`${configs.backendEndPoint}/api/events/${step}`, {
          // params: { limits: 5000 },
          headers: { Authorization: `Bearer ${getIdToken}` },
        });

        /*  TODO : make it as a function
            set options
        */

        const id: Option[] = [];
        const createdAt: Option[] = [];
        const weight: Option[] = [];

        events.forEach((event: Event) => {
          id.push({ label: event.id, value: event.id });
          weight.push({ label: `${event.weight}`, value: event.weight });
          createdAt.push({
            label: moment(event.created_at).locale('ko').format('YYYY-MM-DD HH:mm:ss'),
            value: event.created_at,
          });
        });

        runInAction(() => {
          this.events[step] = events;
          if (step === Fulfillment.picking) {
            events.sort((a: { busket_id: number; }, b: { busket_id: number; }) => a.busket_id > b.busket_id ? 1 : -1);
            const tempArr:any[] = new Array(1000);

            for (let i=0; i<events.length-1; ++i) {
              const currBusketId = events[i].busket_id;
              if (currBusketId !== events[i+1].busket_id) {
                if (tempArr[currBusketId]?.pred)
                  continue;
                tempArr[currBusketId] = events[i];
                continue;
              }

              if (tempArr[currBusketId]?.pred)
                continue;
              
              tempArr[currBusketId] = events[i];
            }
            
            this.events['busket'] = tempArr;
          }

          // Common data
          this.options[step] = {
            ...this.options[step],
            [EventColumn.id]: id,
            [EventColumn.weight]: weight,
            [EventColumn.pred]: [
              { label: 'True', value: true },
              { label: 'False', value: false },
            ],
            [EventColumn.operation]: [
              { label: 'PUT', value: 'PUT' },
              { label: 'END', value: 'END' },
            ],
            [EventColumn.created_at]: createdAt,
          };

          if (step === Fulfillment.picking) {
            this.options[Fulfillment.picking] = {
              ...this.options[Fulfillment.picking],
              [EventColumn.worker_id]: new Array(optionsInfo[0].num_workers)
                .fill(0)
                .map((key, index) => ({ label: `${index}`, value: index })),
              [EventColumn.busket_id]: new Array(optionsInfo[0].num_buskets).fill(0).map((key, index) => ({
                label: `${index}`,
                value: index,
              })),
              [EventColumn.product_id]: new Array(optionsInfo[0].num_products).fill(0).map((key, index) => ({
                label: `${index}`,
                value: index,
              })),
            };
          } else if (step === Fulfillment.packing) {
            this.options[Fulfillment.packing] = {
              ...this.options[Fulfillment.packing],
              [EventColumn.worker_id]: new Array(optionsInfo[0].num_workers)
                .fill(0)
                .map((key, index) => ({ label: `${index}`, value: index })),
              [EventColumn.package_id]: new Array(optionsInfo[0].num_packages).fill(0).map((key, index) => ({
                label: `${index}`,
                value: index,
              })),
              [EventColumn.filling_id]: new Array(optionsInfo[0].num_fillings).fill(0).map((key, index) => ({
                label: `${index}`,
                value: index,
              })),
            };
          } else if (step === Fulfillment.delivery) {
            this.options[Fulfillment.delivery] = {
              ...this.options[Fulfillment.delivery],
              [EventColumn.worker_id]: new Array(optionsInfo[0].num_workers)
                .fill(0)
                .map((key, index) => ({ label: `${index}`, value: index })),
              [EventColumn.package_id]: new Array(optionsInfo[0].num_packages).fill(0).map((key, index) => ({
                label: `${index}`,
                value: index,
              })),
              [EventColumn.region_id]: new Array(optionsInfo[0].num_regions).fill(0).map((key, index) => ({
                label: `${index}`,
                value: index,
              })),
            };
          }
          /* set options */
        });
      } catch (error) {
        throw error;
      }
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
