"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/orders", label: "Pedidos" },
  { href: "/products", label: "Produtos" },
  { href: "/coupons", label: "Cupons" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-red-600 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin 🍕</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded hover:bg-red-700 ${
              pathname.startsWith(link.href) ? "bg-red-700" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
