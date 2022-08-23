import { makeAutoObservable } from 'mobx';
import { Fulfillment } from '../../components/ContentElements/Header/type';
import { Option } from '../../components/ReusableElements/Select';
import { EventColumn } from '../../pages/Picking/type';
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
export const optionssss: readonly Option[] = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
];

/* TODO : get events from event store observerble */
const pickingEvents = [
  {
    [EventColumn.WorkerID]: 0,
    [EventColumn.BasketID]: 1,
    [EventColumn.ProductID]: 9,
    [EventColumn.Weight]: 0.41740172538650305,
    [EventColumn.Operation]: 'PUT',
    [EventColumn.Label]: 'False',
  },
  {
    [EventColumn.WorkerID]: 1,
    [EventColumn.BasketID]: 0,
    [EventColumn.ProductID]: 2,
    [EventColumn.Weight]: 0.4940190375572947,
    [EventColumn.Operation]: 'PUT',
    [EventColumn.Label]: 'False',
  },
  {
    [EventColumn.WorkerID]: 2,
    [EventColumn.BasketID]: 1,
    [EventColumn.ProductID]: 9,
    [EventColumn.Weight]: 0.4969732191272813,
    [EventColumn.Operation]: 'PUT',
    [EventColumn.Label]: 'False',
  },
];

const eventStore = function createEventStore() {
  return makeAutoObservable({
    fulfilmentStep: Fulfillment.Picking,

    /* TODO : the events has to be object like filterValues? */
    pickingEvents: pickingEvents,
    packingEvents: pickingEvents,
    deliveryEvents: pickingEvents,

    filterValues: {
      picking: initFilterValues[Fulfillment.Picking],
      packing: initFilterValues[Fulfillment.Packing],
      delivery: initFilterValues[Fulfillment.Delivery],
    } as { [key: string]: FilterValue },

    get filterEvents(): Array<any> {
      const events = this.pickingEvents;
      const step = this.fulfilmentStep.toLowerCase();

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
