import { flavors } from "@utils/data";


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
