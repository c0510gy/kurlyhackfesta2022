import { Option } from '../../components/ReusableElements/Select';
import { EventColumn } from '../../pages/Picking/type';

export interface FilterValue {
  // [key: string]: string | boolean | Option;
  [EventColumn.WorkerID]?: Option;
  [EventColumn.BasketID]?: Option;
  [EventColumn.PackageID]?: Option;
  [EventColumn.FillingID]?: Option;
  [EventColumn.ProductID]?: Option;
  [EventColumn.Weight]?: Option;
  [EventColumn.Operation]?: Option;
  [EventColumn.Label]?: Option;
  [EventColumn.CreatedAt]?: Option;
}
