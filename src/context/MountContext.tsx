"use client";

import { IFlavors, IPizza, TPizzaSize } from "@/types/pizza";
import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { flavors } from "@/utils/data";

export const types = Object.entries(flavors).map(([key], index) => ({
  id: index,
  name: key,
  quantity: 1,
}));

export const pizzaSizes = [
  { label: "Média", value: "middle", flavors: 2 },
  { label: "Grande", value: "large", flavors: 2 },
  { label: "Família", value: "family", flavors: 3 },
];




interface MountContextType {
  pizza: IPizza;
  setPizza: Dispatch<SetStateAction<IPizza>>;
  addToPizza: (item: IFlavors) => void;
  removeFromPizza: (id: number) => void;
  clearPizza: () => void;
  updatePizzaSize: (newSize: TPizzaSize) => void;
}

const MountContext = createContext<MountContextType>({} as MountContextType);

export function MountProvider({ children }: { children: React.ReactNode }) {
  const [pizza, setPizza] = useState<IPizza>({
    id: '',
    name: '',
    price: 0,
    size: pizzaSizes[0],
    flavors: [],
    quantity: 1,
  });

  useEffect(() => {
    const stored = localStorage.getItem("pizza");
    if (stored) {
      setPizza(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pizza", JSON.stringify(pizza));
  }, [pizza]);


  // Helper to generate pizza name
  const generatePizzaName = (size: any, flavors: IFlavors[]) => {
    const sizeLabel = typeof size === "string" ? size : size.label;
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

  const addToPizza = (item: IFlavors) => {
    setPizza((prev) => {
      const flavors = prev.flavors ?? [];
      const exists = flavors.find((i) => i.id === item.id);
      let newFlavors;
      if (exists) {
        newFlavors = flavors.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity ?? 1) + 1 }
            : i
        );
      } else {
        newFlavors = [...flavors, { ...item, quantity: 1 }];
      }
      return {
        ...prev,
        flavors: newFlavors,
        name: generatePizzaName(prev.size, newFlavors),
        price: updatePizzaPrice(prev.size, newFlavors),
      };
    });
  };

  const removeFromPizza = (id: number) => {
    setPizza((prev) => {
      const newFlavors = (prev.flavors ?? []).filter((item) => item.id !== id);
      return {
        ...prev,
        flavors: newFlavors,
        name: generatePizzaName(prev.size, newFlavors),
        price: updatePizzaPrice(prev.size, newFlavors),

      };
    });
  };

  const clearPizza = () => {
    setPizza((prev) => ({
      ...prev,
      flavors: [],
      name: generatePizzaName(prev.size, []),
      price: updatePizzaPrice(prev.size, []),

    }));
  };

  const updatePizzaSize = (newSize: TPizzaSize) => {
    setPizza((prev) => ({
      ...prev,
      size: newSize,
      name: generatePizzaName(newSize, prev.flavors ?? []),
      price: updatePizzaPrice(newSize, prev.flavors ?? []),

    }));
  };


  return (
    <MountContext.Provider value={{ pizza, setPizza, addToPizza, removeFromPizza, clearPizza, updatePizzaSize }}>
      {children}
    </MountContext.Provider>

  );
}


export function useMount() {
  const context = useContext(MountContext);
  if (!context) throw new Error("useMount must be used within a MountProvider");
  return context;
}
