import { Option } from '../../components/ReusableElements/Select';
import { EventColumn } from '../../pages/Picking/type';

export enum Fulfillment {
  picking = 'picking',
  packing = 'packing',
  delivery = 'delivery',
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

export interface OptionInfo {
  id?: string;
  num_workers?: number;
  num_packages?: number;
  num_regions?: number;
  num_products?: number;
  human_error?: number;
  window_size?: number;
}
