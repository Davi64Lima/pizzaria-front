import CartPageClient from './CartPageClient';

export default function CartPage() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seu carrinho</h1>
      <CartPageClient />
    </div>
  );
}
