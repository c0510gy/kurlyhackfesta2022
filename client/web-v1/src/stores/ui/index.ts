import { makeAutoObservable } from 'mobx';

const uiStore = function createUiStore() {
  return makeAutoObservable({});
};

export default uiStore;
