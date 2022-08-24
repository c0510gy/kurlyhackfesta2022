import { Fulfillment } from '../../../stores/event/type';

export interface Simulator {
  simulation: Fulfillment;
  errorRate: HumanErrorRate;
}

export enum HumanErrorRate {
  Primary = '0.3',
  Elementary = '1',
  Mid = '2',
  High = '50',
}
