"use client";

import { useCart } from '@/context/CartContext'; // ajuste o caminho conforme necessário

export default function CartPageClient() {
    const { cart, removeFromCart, clearCart, addToCart, decrementFromCart } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity!, 0);

    if (cart.length === 0) {
        return (
            <div>
                <p className="text-gray-500">Seu carrinho está vazio no momento.</p>
                <p className="text-gray-500">Vamos adicionar algumas pizzas ?</p>
                <a
                    href="/menu"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded-xl text-lg hover:bg-red-700 transition"
                >
                    Ver Cardápio
                </a>
            </div>
        );
    }



    return (
        <div className="space-y-4">
            {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                            {item.quantity} × R$ {(item.price / 100).toFixed(2)}
                        </p>
                    </div>
                    <button onClick={() => addToCart(item)}
                    >

                        +
                    </button >
                    {cart.find(i => i.id === item.id)?.quantity! > 1 ?
                        <button onClick={() => decrementFromCart(item.id)}
                        >
                            -
                        </button>
                        : null}
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline text-sm"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span>R$ {(total / 100).toFixed(2)}</span>
            </div>

            <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600"
            >
                Clear Cart
            </button>
        </div>
    );
}
