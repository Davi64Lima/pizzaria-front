import Link from "next/link";
import { Pizza, Menu, Tag, MapPin, User, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-red-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <Pizza size={28} />
          Pizzaria das Irmãs
        </Link>

        {/* Navegação */}
        <nav aria-label="Menu principal">
          <ul className="flex gap-5 text-base items-center">
            <li>
              <Link
                href="/mount"
                className="flex items-center gap-1 hover:underline"
              >
                <Menu size={18} /> Montar
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="flex items-center gap-1 hover:underline"
              >
                <Pizza size={18} /> Cardápio
              </Link>
            </li>
            <li>
              <Link
                href="/coupon"
                className="flex items-center gap-1 hover:underline"
              >
                <Tag size={18} /> Promoções
              </Link>
            </li>
            <li>
              <Link
                href="/tracker"
                className="flex items-center gap-1 hover:underline"
              >
                <MapPin size={18} /> Acompanhar
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="flex items-center gap-1 hover:underline"
              >
                <User size={18} /> Login
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="flex items-center gap-1 hover:underline"
              >
                <ShoppingCart size={18} /> Carrinho
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
