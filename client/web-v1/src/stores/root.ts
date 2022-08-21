import uiStore from './ui';
import eventStore from './event';
import authStore from './auth';

export interface RootStore {
  uiStore: ReturnType<typeof uiStore>;
  eventStore: ReturnType<typeof eventStore>;
  authStore: ReturnType<typeof authStore>;
}

const rootStore: RootStore = {
  uiStore: uiStore(),
  eventStore: eventStore(),
  authStore: authStore(),
};

export default rootStore;
