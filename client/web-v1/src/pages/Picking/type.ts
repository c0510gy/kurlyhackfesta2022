export interface Event {
  id?: string;
  worker_id?: number;
  busket_id?: number;
  product_id?: number;
  package_id?: number;
  filling_id?: number;
  region_id?: number;
  weight?: number;
  operation?: string;
  pred?: boolean;
  label?: boolean;
  created_at?: string;
}

export enum EventView {
  ListView = 'List View',
  BasketView = 'Basket View', // Or DAS Zone View
}

export enum EventColumn {
  id = 'id',
  busket_id = 'busket_id',
  filling_id = 'filling_id',
  package_id = 'package_id',
  region_id = 'region_id',
  worker_id = 'worker_id',
  product_id = 'product_id',
  weight = 'weight',
  operation = 'operation',
  label = 'label',
  pred = 'pred',
  created_at = 'created_at',
}

export const mappingPlaceholder: { [key: string]: string } = {
  [EventColumn.id]: 'ID',
  [EventColumn.busket_id]: '바구니 번호',
  [EventColumn.filling_id]: '포장제',
  [EventColumn.package_id]: '포장 상자',
  [EventColumn.region_id]: '지역',
  [EventColumn.worker_id]: '담당자',
  [EventColumn.product_id]: '상품',
  [EventColumn.weight]: '중량',
  [EventColumn.operation]: '상태',
  [EventColumn.pred]: '예측',
  [EventColumn.created_at]: '이벤트 발생 시간',
};
