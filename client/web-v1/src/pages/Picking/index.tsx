import { observer } from 'mobx-react-lite';
import React from 'react';
import PickingTemplate from './templates';
import useStores from '../../hooks/useStores';
import { Fulfillment } from '../../stores/event/type';

const Picking: React.FunctionComponent = (): JSX.Element => {
  const { eventStore } = useStores();

  // Load events logs
  eventStore.loadEvents(Fulfillment.Picking);

  return <PickingTemplate />;
};

export default observer(Picking);
