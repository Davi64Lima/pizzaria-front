export default function Header() {
  return (
    <header className="bg-red-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-around items-center">
        <a href="/" className="text-xl font-bold">Pizzaria das Irmãs 🍕</a>
        <nav className="space-x-4">
          <a href="/mount" className="hover:underline">Montar minha pizza</a>
          <a href="/menu" className="hover:underline">Cardápio</a>
          <a href="/coupon" className="hover:underline">Promoções</a>
          <a href="/tracker" className="hover:underline">Acompanhar pedido</a>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/cart" className="hover:underline">Carrinho</a>
        </nav>
      </div>
    </header>
  );
}
