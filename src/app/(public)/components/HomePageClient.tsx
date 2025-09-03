"use client";

import Image from "next/image";
import pizzaPng from "@assets/pizza.jpg";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { IFlavors } from "@@types/pizza";
import { api } from "@service/api";

export default function HomePageClient() {
  const [flavors, setFlavors] = useState<IFlavors[]>([]);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 24 },
      },
    },
  });

  useEffect(() => {
    async function fetchFlavors() {
      try {
        const response = await api.get("/flavors");
        setFlavors(response.data);
      } catch (err) {
        console.error("Erro ao buscar sabores:", err);
      }
    }

    fetchFlavors();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="text-center py-8 space-y-4">
        <h1 className="text-4xl font-bold">
          Bem-vindo à Pizzaria das Irmãs 🍕
        </h1>
        <p className="text-lg text-gray-600">
          As melhores pizzas da cidade, feitas com ingredientes frescos e muito
          sabor.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-xl text-2x2 hover:bg-red-700 transition"
        >
          Ver Cardápio <ArrowRight size={20} />
        </Link>
      </section>

      {/* Promoções */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🔥 Promoções Especiais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "2 Pizzas Grandes + Refri",
            "Pizza Família + Sobremesa",
            "Combo Econômico",
          ].map((promo, index) => (
            <div
              key={index}
              className="bg-red-100 p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{promo}</h3>
              <p className="text-sm text-gray-600">
                Aproveite essa oferta por tempo limitado!
              </p>
              <Link
                href="/coupon"
                className="inline-block mt-2 text-red-600 font-medium hover:underline"
              >
                Ver mais
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Slide de Pizzas */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🍕 Sabores em Destaque</h2>
        <div ref={sliderRef} className="keen-slider">
          {flavors.map((flavor: IFlavors) => (
            <div
              key={flavor.uuid}
              className="keen-slider__slide bg-white rounded-lg shadow p-2"
            >
              <Image
                src={pizzaPng}
                alt={flavor.name}
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
              <h4 className="mt-2 font-semibold text-center">{flavor.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Outros Itens */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🥤 Outros Itens</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Refrigerante", "Suco", "Cerveja", "Sobremesas"].map(
            (item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg text-center shadow hover:shadow-md"
              >
                <h4 className="font-semibold">{item}</h4>
                <Link
                  href="/menu"
                  className="block text-red-600 text-sm mt-1 hover:underline"
                >
                  Ver mais
                </Link>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
