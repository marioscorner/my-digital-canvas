import ProfileSection from "@/components/portfolio/ProfileSection";
import FeaturedProject from "@/components/portfolio/FeaturedProject";
import SecondaryLinks from "@/components/portfolio/SecondaryLinks";
import ContactSection from "@/components/portfolio/ContactSection";

const Index = () => {
  return (
    <>
      {/* SEO Meta */}
      <title>Tu Nombre | Portfolio Personal</title>
      <meta
        name="description"
        content="Portfolio personal de Tu Nombre. Desarrollador web especializado en React y TypeScript. Descubre mis proyectos y conecta conmigo."
      />

      <main className="min-h-screen bg-background">
        <div className="container py-12 lg:py-20">
          {/* Two-column layout */}
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            {/* Left Column - Profile */}
            <aside
              className="animate-fade-in"
              style={{ animationDelay: "100ms", opacity: 0 }}
            >
              <div className="sticky top-8">
                <ProfileSection />
              </div>
            </aside>

            {/* Right Column - Projects & Links */}
            <div className="space-y-8">
              {/* Featured Project */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "200ms", opacity: 0 }}
              >
                <FeaturedProject />
              </div>

              {/* Secondary Links */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "300ms", opacity: 0 }}
              >
                <SecondaryLinks />
              </div>

              {/* Contact Section */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "400ms", opacity: 0 }}
              >
                <ContactSection />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="container">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
