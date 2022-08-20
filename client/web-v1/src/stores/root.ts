import uiStore from './ui';

export interface RootStore {
  uiStore: ReturnType<typeof uiStore>;
}

const rootStore: RootStore = {
  uiStore: uiStore(),
};

export default rootStore;
