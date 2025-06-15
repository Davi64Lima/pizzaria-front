
import { flavors } from '@/utils/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FlavorCard } from '@/components/FlavorsCard'


export default function Menu() {
  return (
    <section className="max-w-6xl mx-auto p-6 text-center">
      <h1 className="text-5xl font-extrabold mb-4 text-gray-900">Vamos montar seu pedido!</h1>
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
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sabores Tradicionais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {flavors.tradicionais.map((flavor) => (
              <FlavorCard key={flavor.id} flavor={flavor} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="especiais">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sabores Especiais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {flavors.especiais.map((flavor) => (
              <FlavorCard key={flavor.id} flavor={flavor} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="doces">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sabores Doces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {flavors.doces.map((flavor) => (
              <FlavorCard key={flavor.id} flavor={flavor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}