export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export interface IPizza extends IProduct {
  id: string;
  name: string;
  price: number;
  size: TPizzaSize;
  quantity?: number;
  flavors?: IFlavors[];
}

export interface IFlavors {
  id: number;
  name: string;
  description : string;
  quantity?: number
  prices : {
    middle: number;
    large: number;
    family: number
  }
}

export type TPizzaSize = {
    label: string;
    value: string;
    flavors: number;
}