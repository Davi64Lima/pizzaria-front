"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";

export default function CartPageClient() {
  const { cart, removeFromCart, clearCart, addToCart, decrementFromCart } = useCart();
  const { generateOrder, order } = useOrder();

  const [address, setAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity!, 0);

  const handleConfirmOrder = () => {
    generateOrder(cart, {
      name: userName,
      number: userNumber,
    }, {
      street: address,
    }, paymentMethod as any);

    setShowConfirmation(true);
    clearCart();
  };

  if (cart.length === 0 && !showConfirmation) {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-500">Seu carrinho está vazio no momento.</p>
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
    <div className="space-y-6 relative">

      {cart.length > 0 && (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} × R$ {(item.price / 100).toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addToCart(item)}>+</button>
                {item.quantity! > 1 && <button onClick={() => decrementFromCart(item.name)}>-</button>}
                <button onClick={() => removeFromCart(item.name)} className="text-red-500 text-sm">
                  Remover
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>R$ {(total / 100).toFixed(2)}</span>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <h2 className="font-bold text-lg mb-2">Dados do Usuário</h2>
            <input
              type="text"
              placeholder="Nome"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 rounded border mb-2"
            />
            <input
              type="text"
              placeholder="Número (WhatsApp)"
              value={userNumber}
              onChange={(e) => setUserNumber(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>

          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <h2 className="font-bold text-lg mb-2">Endereço de Entrega</h2>
            <input
              type="text"
              placeholder="Endereço completo"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>

          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <h2 className="font-bold text-lg mb-2">Método de Pagamento</h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 rounded border"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão</option>
              <option value="pix">Pix</option>
            </select>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Limpar Carrinho
            </button>

            <button
              onClick={handleConfirmOrder}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Confirmar Pedido
            </button>
          </div>
        </>
      )}

      {/* Modal de Confirmação */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg space-y-4 text-center">
            <h2 className="text-xl font-bold">Pedido Realizado!</h2>
            <p className="text-gray-600">Status: <span className="font-semibold text-yellow-600">Aguardando confirmação</span></p>

            <div className="text-left text-sm text-gray-700 bg-gray-100 rounded p-3 space-y-1">
              <p><strong>Pedido:</strong> #{order.code}</p>
              <p><strong>Nome:</strong> {order.user?.name}</p>
              <p><strong>Contato:</strong> {order.user?.number}</p>
              <p><strong>Endereço:</strong> {order.address?.street}</p>
              <p><strong>Pagamento:</strong> {order.paymentMethod}</p>
              <p><strong>Total:</strong> R$ {(order.value / 100).toFixed(2)}</p>
            </div>

            <button
              onClick={() => setShowConfirmation(false)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
