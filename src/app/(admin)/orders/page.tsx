// app/admin/orders/page.tsx
"use client";

import React from "react";

const statuses = [
  { key: "waiting", label: "🕐 Esperando aprovação" },
  { key: "todo", label: "🧾 A fazer" },
  { key: "preparing", label: "🍳 Preparando" },
  { key: "ready", label: "📦 Pronto" },
  { key: "delivering", label: "🚚 Entregando" },
  { key: "completed", label: "✅ Finalizado" },
];

const mockOrders = [
  { id: "1", client: "Maria", status: "waiting" },
  { id: "2", client: "João", status: "todo" },
  { id: "3", client: "Pedro", status: "preparing" },
  { id: "4", client: "Ana", status: "ready" },
  { id: "5", client: "Lucas", status: "delivering" },
  { id: "6", client: "Bruna", status: "completed" },
];

export default function OrdersPage() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {statuses.map((col) => {
        const ordersInCol = mockOrders.filter((o) => o.status === col.key);
        return (
          <div key={col.key} className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-md mb-4">{col.label}</h2>
            <div className="space-y-3">
              {ordersInCol.length === 0 ? (
                <p className="text-sm text-gray-400">Nenhum pedido</p>
              ) : (
                ordersInCol.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 rounded border bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <p className="font-medium">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-600">Cliente: {order.client}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
