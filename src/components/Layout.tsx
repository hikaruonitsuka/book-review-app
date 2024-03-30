import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto,1fr,auto]">
      <Header />
      <main className="my-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
