import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Exploring = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background">
      <Header />
      <main className="flex-1 px-5 py-6 space-y-5">
        <h2 className="font-display text-xl font-semibold text-foreground">Explore at your pace</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Take your time to browse topics, resources, and stories that may help you better understand what you or someone close to you is going through. There's no pressure — just a safe space to learn and reflect.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Exploring;
