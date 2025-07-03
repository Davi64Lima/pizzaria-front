"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { FlavorCard } from "@components/FlavorsCard";
import { IFlavors } from "@@types/pizza";

export default function Menu() {
  const [flavors, setFlavors] = useState({
    tradicionais: [],
    especiais: [],
    doces: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlavors() {
      try {
        const res = await fetch("http://localhost:3000/flavors");
        const data = await res.json();

        // Organiza os sabores por categoria
        const tradicionais = data.filter(
          (f: IFlavors) => f.type === "TRADICIONAL"
        );
        const especiais = data.filter((f: IFlavors) => f.type === "SPECIAL");
        const doces = data.filter((f: IFlavors) => f.type === "DOCE");

        setFlavors({ tradicionais, especiais, doces });
      } catch (err) {
        console.error("Erro ao buscar sabores:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFlavors();
  }, []);

  if (loading) {
    return <p className="text-center text-xl mt-10">Carregando sabores...</p>;
  }

  return (
    <section className="max-w-6xl mx-auto p-6 text-center">
      <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
        Vamos montar seu pedido!
      </h1>
      <p className="text-xl mb-10 text-gray-700">
        Escolha seus sabores favoritos e aproveite uma experiência deliciosa!
      </p>

      <Tabs defaultValue="tradicionais" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="tradicionais">Sabores Tradicionais</TabsTrigger>
          <TabsTrigger value="especiais">Sabores Especiais</TabsTrigger>
          <TabsTrigger value="doces">Sabores Doces</TabsTrigger>
        </TabsList>

        <TabsContent value="tradicionais">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Sabores Tradicionais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {flavors.tradicionais.map((flavor: IFlavors) => (
              <FlavorCard key={flavor.uuid} flavor={flavor} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="especiais">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Sabores Especiais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {flavors.especiais.map((flavor: IFlavors) => (
              <FlavorCard key={flavor.uuid} flavor={flavor} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="doces">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Sabores Doces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {flavors.doces.map((flavor: IFlavors) => (
              <FlavorCard key={flavor.uuid} flavor={flavor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
