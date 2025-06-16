"use client";

import { useEffect, useState } from "react";
import { flavors } from "@utils/data";
import { IFlavors } from "@@types/pizza";
import { pizzaSizes, types } from "@context/PizzaContext";
import { usePizza } from "@context/PizzaContext";

import { Check, ShoppingCart, Plus, CloudCog } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { cartSliceActions } from "@store/slices/cart";
import { useAppSelector } from "@hooks/redux/useAppSelector";
import { useAppDispatch } from "@hooks/redux/useAppDispatch";

export default function MontarPizzaPage() {
  const [type, setType] = useState(types[0]);
  const [showConfirm, setShowConfirm] = useState(false);
  const { pizza, addToPizza, clearPizza, removeFromPizza, updatePizzaSize } = usePizza();
  const { cart } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()
  const router = useRouter();

  const toggleFlavor = (flavor: IFlavors) => {
    if (pizza.flavors?.some((f) => f.id === flavor.id)) {
      removeFromPizza(flavor.id);
    } else if (pizza.flavors && pizza.flavors.length < pizza.size.flavors) {
      addToPizza(flavor);
    }
  };

  useEffect(()=>{
    console.log(cart)
  },[cart])

  const confirmPizza = () => {
    if (cart.length === 0) {
      console.log('create card',pizza)
      dispatch(cartSliceActions.saveCart([pizza]))
    } else {
      console.log('add pizza', pizza)
       dispatch(cartSliceActions.addToCart(pizza))
    }
    setShowConfirm(true);
  };

  const finalize = (toCart = false) => {
    clearPizza();
    setShowConfirm(false);
    if (toCart) router.push("/cart");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">🍕 Monte sua Pizza</h1>

      {/* Escolha do tamanho */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Escolha o tamanho:</h2>
        <div className="grid grid-cols-3 gap-2">
          {pizzaSizes.map((s) => (
            <button
              key={s.value}
              onClick={() => {
                updatePizzaSize(s);
                clearPizza();
              }}
              className={`p-2 rounded-lg border transition ${
                pizza.size.value === s.value
                  ? "bg-yellow-500 text-black font-bold"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Escolha do tipo */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Tipo de Pizza:</h2>
        <div className="flex gap-2">
          {types.map((s) => (
            <button
              key={s.id}
              onClick={() => setType(s)}
              className={`flex-1 py-2 rounded-lg border transition ${
                type.id === s.id
                  ? "bg-yellow-500 text-black font-bold"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </section>

      {/* Escolha dos sabores */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">
          Escolha até {pizza.size.flavors} sabor{pizza.size.flavors > 1 && "es"}:
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {(flavors[type.name as keyof typeof flavors] ?? []).map((flavor) => {
            const selected = pizza.flavors?.some((f) => f.id === flavor.id);
            const disabled =
              !selected && (pizza.flavors?.length ?? 0) >= pizza.size.flavors;

            return (
              <button
                key={flavor.id}
                onClick={() => toggleFlavor(flavor)}
                disabled={disabled}
                className={`text-left p-3 rounded-lg border relative ${
                  selected
                    ? "bg-yellow-400 text-black font-semibold"
                    : "bg-gray-100 text-gray-800"
                } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-100 transition"}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span>{flavor.name}</span>
                  {selected && <Check size={18} />}
                </div>
                <p className="text-xs text-gray-600">{flavor.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Botão Finalizar */}
      <button
        className={`w-full flex justify-center items-center gap-2 bg-yellow-500 text-black py-3 rounded-lg font-bold text-lg transition ${
          (pizza.flavors?.length ?? 0) !== pizza.size.flavors
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-yellow-400"
        }`}
        disabled={(pizza.flavors?.length ?? 0) !== pizza.size.flavors}
        onClick={confirmPizza}
      >
        <ShoppingCart size={20} />
        {(pizza.flavors?.length ?? 0) === pizza.size.flavors
          ? "Adicionar ao carrinho"
          : `Escolha ${pizza.size.flavors - (pizza.flavors?.length ?? 0)} sabor(es)`}
      </button>

      {/* Modal de Confirmação */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>✅ Pizza adicionada ao carrinho!</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Tamanho:</strong> {pizza.size.label}</p>
            <p><strong>Sabores:</strong> {pizza.flavors?.map((f) => f.name).join(", ")}</p>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => finalize(false)}>
              <Plus size={16} className="mr-1" /> Montar outra
            </Button>
            <Button onClick={() => finalize(true)} className="bg-yellow-500 text-black hover:bg-yellow-400">
              <ShoppingCart size={16} className="mr-1" /> Ir para o carrinho
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
