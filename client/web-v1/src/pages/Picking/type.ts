export enum EventView {
  ListView = 'List View',
  BasketView = 'Basket View', // Or DAS Zone View
}

export enum EventColumn {
  BasketID = '바구니 번호',
  FillingID = '포장제 종류?',
  PackageID = '포장 상자 종류',
  RegionID = '지역',
  WorkerID = '담당자',
  ProductID = '상품',
  Weight = '중량',
  Operation = '상태', // PUT or END
  Label = 'Label',
  CreatedAt = '이벤트 발생 시간',
}
