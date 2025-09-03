"use client";

import Link from "next/link";
import {
  Pizza,
  Menu,
  Tag,
  MapPin,
  User,
  ShoppingCart,
  LogOut,
  Settings,
} from "lucide-react";
import { useAppSelector } from "@hooks/redux/useAppSelector";
import { useAppDispatch } from "@hooks/redux/useAppDispatch";
import { logout } from "@store/slices/auth";
import { UserRole } from "@store/slices/auth/types";
import { useState } from "react";

export default function HeaderClient() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

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

            {/* Área de autenticação */}
            {isAuthenticated ? (
              <li className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 hover:underline"
                >
                  <User size={18} /> {user?.name || "Usuário"}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">
                        {user?.email}
                      </div>

                      {user?.role === UserRole.ADMIN && (
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings size={16} />
                          Painel Admin
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1 hover:underline"
                >
                  <User size={18} /> Login
                </Link>
              </li>
            )}

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
