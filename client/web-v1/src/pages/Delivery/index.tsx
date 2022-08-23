import { observer } from 'mobx-react-lite';
import React from 'react';
import DeliveryTemplate from './templates';
import useStores from '../../hooks/useStores';

const Delivery: React.FunctionComponent = (): JSX.Element => {
  const { eventStore } = useStores();

  // Load events logs
  eventStore.loadEvents();

  return <DeliveryTemplate />;
};

export default observer(Delivery);
