import { flavors } from '@/utils/data';
import { FlavorCard } from '@/components/FlavorsCard';

export default function Order() {
  return (
    <section className="max-w-6xl mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold mb-4">Vamos montar seu pedido!</h2>
      <p className="text-lg mb-6 text-gray-700">Escolha seus sabores favoritos e aproveite!</p>
      <h3 className="text-3xl font-bold mb-4">Sabores tradicionais :</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {flavors.tradicionais.map((flavor) => (
          <FlavorCard key={flavor.id} flavor={flavor} />
        ))}
      </div>
      <h3 className="text-3xl font-bold mb-4">Sabores especiais :</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {flavors.especiais.map((flavor) => (
          <FlavorCard key={flavor.id} flavor={flavor} />
        ))}
      </div>
      <h3 className="text-3xl font-bold mb-4">Sabores doces :</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {flavors.doces.map((flavor) => (
          <FlavorCard key={flavor.id} flavor={flavor} />
        ))}
      </div>
    </section>
  );
}

