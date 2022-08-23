import { Fulfillment } from '../../../stores/event/type';

export interface RoutesType {
  path: string;
  text: string | Fulfillment;
}
