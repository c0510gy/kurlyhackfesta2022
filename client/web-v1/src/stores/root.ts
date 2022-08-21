import uiStore from './ui';
import eventStore from './event';

export interface RootStore {
  uiStore: ReturnType<typeof uiStore>;
  eventStore: ReturnType<typeof eventStore>;
}

const rootStore: RootStore = {
  uiStore: uiStore(),
  eventStore: eventStore(),
};

export default rootStore;
