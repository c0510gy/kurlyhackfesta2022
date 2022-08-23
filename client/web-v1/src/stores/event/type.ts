import { Option } from '../../components/ReusableElements/Select';
import { EventColumn } from '../../pages/Picking/type';

export enum Fulfillment {
  Picking = 'Picking',
  Packing = 'Packing',
  Delivery = 'Delivery',
}

export interface FilterValue {
  // [key: string]: string | boolean | Option;
  [EventColumn.worker_id]?: Option;
  [EventColumn.busket_id]?: Option;
  [EventColumn.package_id]?: Option;
  [EventColumn.filling_id]?: Option;
  [EventColumn.product_id]?: Option;
  [EventColumn.weight]?: Option;
  [EventColumn.operation]?: Option;
  [EventColumn.label]?: Option;
  [EventColumn.created_at]?: Option;
}
