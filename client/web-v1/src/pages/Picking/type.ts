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
  ID = 'ID',
  BasketID = '바구니 번호',
  FillingID = '포장제 종류?',
  PackageID = '포장 상자 종류',
  RegionID = '지역',
  WorkerID = '담당자',
  ProductID = '상품',
  Weight = '중량',
  Operation = '상태', // PUT or END
  Label = 'Label',
  PRED = '예측',
  CreatedAt = '이벤트 발생 시간',
}
