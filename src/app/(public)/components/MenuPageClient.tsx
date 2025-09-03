"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { FlavorCard } from "@components/FlavorsCard";
import { IFlavors } from "@@types/pizza";

export default function MenuPageClient() {
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
    <>
      <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
        Vamos montar seu pedido!
      </h1>
      <p className="text-xl mb-10 text-gray-700">
        Escolha entre nossos deliciosos sabores ou monte sua pizza personalizada.
      </p>

      <Tabs defaultValue="tradicionais" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="tradicionais" className="text-lg">
            Tradicionais
          </TabsTrigger>
          <TabsTrigger value="especiais" className="text-lg">
            Especiais
          </TabsTrigger>
          <TabsTrigger value="doces" className="text-lg">
            Doces
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tradicionais">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flavors.tradicionais.map((flavor: IFlavors) => (
              <FlavorCard key={flavor.id} flavor={flavor} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="especiais">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flavors.especiais.map((flavor: IFlavors) => (
              <FlavorCard key={flavor.id} flavor={flavor} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="doces">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flavors.doces.map((flavor: IFlavors) => (
              <FlavorCard key={flavor.id} flavor={flavor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
