export interface Product {
  id: string;
  name: string;
  imgPath: string;
  defaultPrice: number;
  salePrice: number;
  status: Status;
}

export enum Status {
  STAND_BY = 'STAND_BY',
  DISPLAY = 'DISPLAY',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  SOLD_OUT = 'SOLD_OUT',
  END = 'END'
}
