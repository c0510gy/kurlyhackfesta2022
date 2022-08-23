import { observer } from 'mobx-react-lite';
import React from 'react';
import PackingTemplate from './templates';
import useStores from '../../hooks/useStores';

const Packing: React.FunctionComponent = (): JSX.Element => {
  const { eventStore } = useStores();

  // Load events logs
  eventStore.loadEvents();

  return <PackingTemplate />;
};

export default observer(Packing);
