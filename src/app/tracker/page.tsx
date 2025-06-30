'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { IProduct } from '@@types/pizza';
import { useAppSelector } from '@hooks/redux/useAppSelector';
import { useAppDispatch } from '@hooks/redux/useAppDispatch';
import { IOrder } from '@store/slices/order/types';

export default function TrackerPage() {
  const { order } = useAppSelector(state => state.order);
  const dispatch = useAppDispatch()
  const [trackingCode, setTrackingCode] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [foundOrder, setFoundOrder] = useState<IOrder>({} as IOrder); // Para armazenar o pedido encontrado

  const handleTrackOrder = () => {
    // Aqui você faria uma chamada à API para buscar o status do pedido
    // usando o 'trackingCode'. Por enquanto, vamos simular.

    if (trackingCode === order.code && order) {
      setOrderStatus('Seu pedido está em preparação!');
      setFoundOrder(order); 
    } else if (trackingCode) {
      setOrderStatus('Código de pedido não encontrado.');
      setFoundOrder({} as IOrder); // Limpa os detalhes do pedido
    } else {
      setOrderStatus('Por favor, digite um código de pedido.');
      setFoundOrder({} as IOrder); // Limpa os detalhes do pedido
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-4"> {/* Ajuste o min-h para sua altura de header/footer se tiver */}
      <Card className="w-full max-w-lg shadow-xl rounded-lg p-6 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">Acompanhar Pedido</CardTitle>
          <CardDescription className="text-gray-600">
            Digite o código do seu pedido para verificar o status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="trackingCode" className="block text-gray-700 font-medium mb-2">
              Código do Pedido:
            </Label>
            <Input
              id="trackingCode"
              placeholder="Ex: 12345ABC"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              onKeyDown={(e) => { // Permite "Enter" para buscar
                if (e.key === 'Enter') {
                  handleTrackOrder();
                }
              }}
            />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
            onClick={handleTrackOrder}
          >
            Acompanhar Pedido
          </Button>

          {orderStatus && (
            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-md">
              <p className="font-semibold text-lg mb-2">Status do Pedido:</p>
              <p>{orderStatus}</p>
              {foundOrder && (
                <div className="mt-4 border-t border-blue-200 pt-4">
                  <h3 className="text-md font-bold mb-2">Detalhes do Pedido #{foundOrder.code}:</h3>
                  <ul>
                    {foundOrder.products && foundOrder.products.map((item: IProduct, index: number) => (
                      <li key={index} className="text-sm">
                        {item.quantity}x {item.name} - R$ {(item.price/100).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  {foundOrder.value && (
                    <p className="mt-2 font-semibold">Total: R$ {(foundOrder.value/100).toFixed(2)}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500 mt-6">
          <p>Para dúvidas, entre em contato com nosso suporte.</p>
        </CardFooter>
      </Card>
    </section>
  );
}