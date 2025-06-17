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

export interface IAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  reference?: string;
  latitude?: number;
  longitude?: number;
  formattedAddress?: string;
}

export interface IUser {
  name: string;
  phone: string;
  email?: string;
  password?: string;
}

export enum EOrderPaymentMethod {
  CREDIT_CARD = 'credit_card',
  CASH = 'cash',
  PIX = 'pix'
}

export interface IOrderPaymentMethod {
  creditCard?: {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
  };
  cash?: boolean;
  pix?: boolean;
}

export enum EOrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  DELIVERED = 'delivered',
}