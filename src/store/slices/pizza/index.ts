import { IProduct } from "@@types/pizza";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ESliceNames } from "../types";
import { IFlavors, IPizza, TPizzaSize } from "@@types/pizza";
import {pizzaSizes,types} from './types'

const initialState = {
    pizza : {
    id: '',
    name: '',
    price: 0,
    size: pizzaSizes[0],
    flavors: [] as IFlavors[],
    quantity: 1,
  } as IPizza
}

//  Helper to generate pizza name
  const generatePizzaName = (size: TPizzaSize, flavors: IFlavors[]) => {
    const sizeLabel = size.label;
    const flavorNames = (flavors ?? []).map(f => f.name).join(" + ");
    return `${sizeLabel}${flavorNames ? " + " + flavorNames : ""}`;
  };

  
const updatePizzaPrice = (size: TPizzaSize, flavors: IFlavors[]) => {
  // Map pizzaSizes values to price keys
  const priceKey = typeof size === "string" ? size : size.value;
  // Calculate the highest price among selected flavors for the given size
  return flavors.reduce((max, i) => {
    const price = i.prices[priceKey as keyof typeof i.prices];
    return price > max ? price : max;
  }, 0);
}


export const pizzaSlice = createSlice({
    name : ESliceNames.PIZZA,
    initialState,
    reducers : {
        setPizza: (state,action) => {
            state.pizza = action.payload
        },
        addToPizza: (state, action: PayloadAction<IFlavors>) => {
            const exists = state.pizza.flavors?.find((flavor) => flavor.id === action.payload.id);
            if (exists) {
                state.pizza.flavors = state.pizza.flavors?.map((flavor) =>
                    flavor.id === action.payload.id
                        ? { ...flavor, quantity: (flavor.quantity ?? 1) + 1 }
                        : flavor
                );
            } else {
                state.pizza.flavors?.push({ ...action.payload, quantity: 1 });
            }
            state.pizza.name = generatePizzaName(state.pizza.size, state.pizza.flavors ?? []);
            state.pizza.price = updatePizzaPrice(state.pizza.size, state.pizza.flavors ?? []);
        },
        removeFromPizza : (state,action:PayloadAction<number>) =>{
            state.pizza.flavors = state.pizza.flavors?.filter((flavor)=> flavor.id !== action.payload)
            state.pizza.name = generatePizzaName(state.pizza.size, state.pizza.flavors ?? []);
            state.pizza.price = updatePizzaPrice(state.pizza.size, state.pizza.flavors ?? []);
        },
        clearPizza: (state) => {
            state.pizza.flavors = [];
            state.pizza.name = generatePizzaName(state.pizza.size, []);
            state.pizza.price = updatePizzaPrice(state.pizza.size, []);
        },
        updatePizzaSize: (state, action: PayloadAction<TPizzaSize>) => {
            state.pizza.size = action.payload;
            state.pizza.name = generatePizzaName(action.payload, state.pizza.flavors ?? []);
            state.pizza.price = updatePizzaPrice(action.payload, state.pizza.flavors ?? []);
        },
    }
})

export const {reducer:pizzaSliceReducer,actions:pizzaSliceActions} = pizzaSlice