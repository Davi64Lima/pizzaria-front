import { EOrderPaymentMethod, EOrderStatus, IProduct, IOrderPaymentMethod, IAddress, IUser } from "@@types/pizza";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ESliceNames } from "../types";
import { IOrder } from "./types";



const initialState = {
    order: {
        id: '',
        code: '',
        products: [],
        address: {
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            zipcode: "",
        },
        user: {
            name: "",
            phone: "",
        },
        value: 0,
        payment: {} as IOrderPaymentMethod,
        paymentMethod: EOrderPaymentMethod.CASH,
        status: EOrderStatus.PENDING,
    } as IOrder
};

const generateBookingCode = () => {
    const code = (Math.random() + 1).toString(36).replace('0', '').replace('o', '').replace('i', '').replace('j', '').substring(2, 7).toUpperCase()
    return code
}


export const orderSlice = createSlice({
    name: ESliceNames.ORDER,
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<IOrder>) => {
            state.order = action.payload;
        },
        updateOrderStatus: (state, action: PayloadAction<EOrderStatus>) => {
            state.order.status = action.payload;
        },
        clearOrder: () => {
            return initialState;
        },
        addProductToOrder: (state, action: PayloadAction<IProduct>) => {
            state.order.products.push(action.payload);
            state.order.value += action.payload.price * (action.payload.quantity ?? 1);
        },
        removeProductFromOrder: (state, action: PayloadAction<string>) => {
            const productIndex = state.order.products.findIndex(p => p.id === action.payload);
            if (productIndex !== -1) {
                const product = state.order.products[productIndex];
                state.order.value -= product.price * (product.quantity ?? 1);
                state.order.products.splice(productIndex, 1);
            }
        },
        updateProductQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const product = state.order.products.find(p => p.id === productId);
            if (product) {
                const oldQuantity = product.quantity ?? 1;
                product.quantity = quantity;
                state.order.value += (quantity - oldQuantity) * product.price;
            }
        },
        setPaymentMethod: (state, action: PayloadAction<EOrderPaymentMethod>) => {
            state.order.paymentMethod = action.payload;
        },

        generateOrder: (
            state,
            action: PayloadAction<{
                products: IProduct[];
                user: IUser;
                address: IAddress;
                paymentMethod: EOrderPaymentMethod;
            }>
        ) => {
            const { products, user, address, paymentMethod } = action.payload;
            const totalOrderValue = products.reduce((acc, i) => acc + (i.price * (i.quantity ?? 1)), 0);
            state.order.id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
            state.order.code = generateBookingCode();
            state.order.products = products;
            state.order.address = address;
            state.order.user = user;
            state.order.value = totalOrderValue;
            state.order.paymentMethod = paymentMethod;
            state.order.status = EOrderStatus.PENDING;
        }

    }
})

export const { reducer: orderSliceReducer, actions: orderSliceActions } = orderSlice
