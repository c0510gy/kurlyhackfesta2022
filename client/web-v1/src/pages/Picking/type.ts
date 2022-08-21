export enum EventView {
  ListView = 'List View',
  BasketView = 'Basket View', // Or DAS Zone View
}

export enum EventColumn {
  BasketID = '바구니 번호',
  ProductID = '상품',
  WorkerID = '담당자',
  Weight = '중량',
  Operation = '상태', // PUT or END
  Label = 'Label',
  Timestamp = '시간',
}
