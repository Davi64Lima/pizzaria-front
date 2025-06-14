export default function Home() {
  return (
    <section className="max-w-6xl mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold mb-4">Bem-vindo à Pizzaria Bella Massa!</h2>
      <p className="text-lg mb-6 text-gray-700">As melhores pizzas da cidade, feitas com ingredientes frescos e muito sabor.</p>
      <a
        href="/menu"
        className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-red-700 transition"
      >
        Ver Cardápio
      </a>
    </section>
  );
}
