import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistReducer } from "redux-persist";
import { ESliceNames } from "./slices/types";
import { cartSliceReducer as cart } from "./slices/cart";
import { pizzaSliceReducer as pizza } from "./slices/pizza";
import { orderSliceReducer as order } from "./slices/order";

const combinedReducers = combineReducers({
  cart,
  pizza,
  order,
});

const reducerProxy = (
  state: ReturnType<typeof combinedReducers> | undefined,
  action: AnyAction
) => {
  return combinedReducers(state, action);
};

export const persistedReducers = () => {
  const persistedReducer = persistReducer(
    {
      key: `pizzaria-irmas-redux`,
      storage,
      // WhiteList contains a list of Slices names which can be stored on AsyncStorage
      whitelist: [ESliceNames.CART, ESliceNames.PIZZA, ESliceNames.ORDER],
    },
    reducerProxy as typeof combinedReducers
  );

  return persistedReducer;
};
