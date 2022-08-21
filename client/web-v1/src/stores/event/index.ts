import { makeAutoObservable } from 'mobx';
import { Fulfillment } from '../../components/ContentElements/Header/type';

const eventStore = function createEventStore() {
  return makeAutoObservable({
    filterValues: Fulfillment.Picking,
  });
};

export default eventStore;
