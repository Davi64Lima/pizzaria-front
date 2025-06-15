"use client";

import Image from 'next/image';
import pizzaPng from '@/assets/pizza.jpg';
import { usePizza } from '@/context/PizzaContext'; 
import { IFlavors } from '@/@types/pizza';
import { useRouter } from 'next/navigation'; 




export function FlavorCard({ flavor }: { flavor: IFlavors }) {
  const router = useRouter();
  const { addToPizza,pizza } = usePizza();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 max-w-xs">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={pizzaPng}
          alt="Pizza"
          width={400}
          height={300}
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h3 className="mt-3 text-center text-xl font-bold">{flavor.name}</h3>

      <p className="text-gray-600 text-center">
        {flavor.description}
      </p>


      <button
        onClick={() => {
          if (pizza.flavors && pizza.flavors.length < pizza.size.flavors) {
          addToPizza(flavor)
          }
          router.push('/mount')
        }}
        
        className="group relative mt-4 w-full bg-yellow-500 text-black font-semibold py-2 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all"
      >
        <span className="block group-hover:hidden">
          A partir de R$ {(flavor.prices.middle / 100).toFixed(2)}
        </span>
        <span className="hidden group-hover:block">
          Montar pizza!
        </span>
      </button>

    </div>
  );
}
