import uiStore from './ui';
import authStore from './auth'

export interface RootStore {
  uiStore: ReturnType<typeof uiStore>;
  authStore: ReturnType<typeof authStore>;
}

const rootStore: RootStore = {
  uiStore: uiStore(),
  authStore: authStore(),
};

export default rootStore;
