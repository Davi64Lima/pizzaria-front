import Footer from "@components/Footer";
import HeaderClient from "@components/HeaderClient";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderClient />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
