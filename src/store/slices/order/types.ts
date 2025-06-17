import { IAddress, IOrderPaymentMethod, IProduct, IUser,EOrderStatus, EOrderPaymentMethod } from "@@types/pizza";

export type IOrder = {
  id: string;
  code: string
  products: IProduct[],
  address: IAddress,
  user: IUser,
  value: number,
  payment: IOrderPaymentMethod,
    paymentMethod: EOrderPaymentMethod,
  status: EOrderStatus,
}
