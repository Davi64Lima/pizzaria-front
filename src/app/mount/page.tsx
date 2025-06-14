"use client";

import { useEffect, useState } from "react";
import { flavors } from "@/utils/data";
import { IFlavors } from "@/types/pizza";
import { pizzaSizes, types } from "@/context/MountContext";
import { useMount } from "@/context/MountContext";
import { useCart } from "@/context/CartContext";
 






export default function MontarPizzaPage() {
  const [type, setType] = useState(types[0])
  const {pizza,addToPizza,clearPizza,removeFromPizza,updatePizzaSize,setPizza} = useMount()
  const {addToCart} = useCart()

                


  const toggleFlavor = (flavor: IFlavors) => {
    if (pizza.flavors && (pizza.flavors ?? []).some((f: IFlavors) => f.id === flavor.id)) {
      console.log('remove',flavor)
      removeFromPizza(flavor.id);
    } else if (pizza.flavors && pizza.flavors.length < pizza.size.flavors) {
      console.log('add',flavor)
      addToPizza(flavor);
    }
  };



  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Monte sua Pizza 🍕</h1>

      {/* Escolha do tamanho */}
<div className="mb-6 flex gap-2">
  {pizzaSizes.map((s) => (
    <button
      key={s.value}
      onClick={() => {
        updatePizzaSize(s);
        clearPizza(); 
      }}
      className={`flex-1 py-2 rounded-lg border ${
        pizza.size.value === s.value
          ? "bg-yellow-500 text-black font-bold"
          : "bg-gray-100"
      }`}
    >
      {s.label}
    </button>
  ))}
</div>

      {/* Escolha do tipo */}
<div className="mb-6 flex gap-2">
  {types.map((s) => (
    <button
      key={s.id}
      onClick={() => {
       setType(s)
      }}
      className={`flex-1 py-2 rounded-lg border ${
        type.id === s.id
          ? "bg-yellow-500 text-black font-bold"
          : "bg-gray-100"
      }`}
    >
      {s.name}
    </button>
  ))}
</div>

      {/* Escolha dos sabores */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">
          Escolha até {pizza.size.flavors} sabor{pizza.size.flavors > 1 && "es"}:
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {(flavors[type.name as keyof typeof flavors] ?? []).map((flavor: IFlavors) => (
            <button
              key={flavor.id}
              onClick={() => toggleFlavor(flavor)}
              className={`py-2 px-3 rounded-lg border ${
                (pizza.flavors ?? []).some((f: IFlavors) => f.id === flavor.id)
                  ? "bg-yellow-500 text-black font-bold"
                  : "bg-gray-100"
              }`}
              disabled={
                !(pizza.flavors ?? []).some((f: IFlavors) => f.id === flavor.id) &&
                (pizza.flavors?.length ?? 0) >= pizza.size.flavors
              }
            >
              {flavor.name}
              <p className="text-sm text-zinc-600">{flavor.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Resumo e finalizar */}
      <div className="text-center space-y-2">
        <p>
          <span className="font-bold">Tamanho:</span> {pizza.size.label}
        </p>
        <p>
          <span className="font-bold">Sabores:</span>{" "}
          {(pizza.flavors ?? []).length > 0
            ? (pizza.flavors ?? []).map((flavor: IFlavors) => flavor.name).join(", ")
            : "Nenhum sabor selecionado"}
        </p>

        <button
          className="mt-2 w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition"
          disabled={(pizza.flavors?.length ?? 0) !== pizza.size.flavors}
          onClick={() => addToCart(pizza)}
        >
          {(pizza.flavors?.length ?? 0) === pizza.size.flavors
            ? "Adicionar ao carrinho"
            : `Escolha ${pizza.size.flavors - (pizza.flavors?.length ?? 0)} sabor(es)`}
        </button>
      </div>
    </div>
  );
}
