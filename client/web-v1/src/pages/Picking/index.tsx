import { observer } from 'mobx-react-lite';
import React from 'react';
import PickingTemplate from './templates';
import useStores from '../../hooks/useStores';

const Picking: React.FunctionComponent = (): JSX.Element => {
  const { eventStore } = useStores();

  // Load events logs
  eventStore.loadEvents();

  return <PickingTemplate />;
};

export default observer(Picking);
