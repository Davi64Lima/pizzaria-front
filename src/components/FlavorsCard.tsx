"use client";

import Image from 'next/image';
import pizzaPng from '@/assets/pizza.jpg';
import { usePizza } from '@/context/PizzaContext';
import { IFlavors } from '@/@types/pizza';
import { useRouter } from 'next/navigation';


import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Se você for usar botões dentro do card

interface FlavorCardProps {
  flavor: IFlavors;
}


export function FlavorCard({ flavor }: { flavor: IFlavors }) {
  const router = useRouter();
  const { addToPizza, pizza } = usePizza();

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex-grow">
        {/* Você pode adicionar uma imagem aqui se tiver */}
        {
          <Image
            src={pizzaPng}
            alt="Pizza"
            width={400}
            height={300}
            className="object-cover hover:scale-105 transition-transform rounded-2xl duration-300"
          />}
        <CardTitle className="text-xl font-semibold">{flavor.name}</CardTitle>
        <CardDescription className="text-gray-600 mt-2">{flavor.description}</CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto">
        {/* Exemplo de botão, descomente se for usar */}
        <Button
          onClick={() => {
            if (pizza.flavors && pizza.flavors.length < pizza.size.flavors) {
              addToPizza(flavor)
            }
            router.push('/mount')
          }}
          className="group relative mt-4 w-full bg-yellow-500 text-black font-semibold py-2 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all"

        >          <span className="block group-hover:hidden">
            A partir de R$ {(flavor.prices.middle / 100).toFixed(2)}
          </span>
          <span className="hidden group-hover:block">
            {pizza.flavors && pizza.flavors.length < pizza.size.flavors
              ? 'Adicionar à Pizza'
              : 'Limite de sabores atingido'}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}