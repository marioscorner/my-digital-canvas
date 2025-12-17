import HeroSection from "@/components/portfolio/HeroSection";
import AboutCard from "@/components/portfolio/AboutCard";
import TechStackCard from "@/components/portfolio/TechStackCard";
import FeaturedProject from "@/components/portfolio/FeaturedProject";
import ContactCard from "@/components/portfolio/ContactCard";
import SocialLinks from "@/components/portfolio/SocialLinks";

const Index = () => {
  return (
    <>
      <title>Tu Nombre | Desarrollador Web</title>
      <meta
        name="description"
        content="Portfolio personal de Tu Nombre. Desarrollador web especializado en React y TypeScript."
      />

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          {/* Bento Grid Layout */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Hero - spans 2 columns */}
            <div
              className="md:col-span-2 animate-fade-in"
              style={{ animationDelay: "0ms", opacity: 0 }}
            >
              <HeroSection />
            </div>

            {/* About Me */}
            <div
              className="animate-fade-in"
              style={{ animationDelay: "100ms", opacity: 0 }}
            >
              <AboutCard />
            </div>

            {/* Contact */}
            <div
              className="animate-fade-in"
              style={{ animationDelay: "150ms", opacity: 0 }}
            >
              <ContactCard />
            </div>

            {/* Tech Stack */}
            <div
              className="animate-fade-in"
              style={{ animationDelay: "200ms", opacity: 0 }}
            >
              <TechStackCard />
            </div>

            {/* Featured Project */}
            <div
              className="animate-fade-in"
              style={{ animationDelay: "250ms", opacity: 0 }}
            >
              <FeaturedProject />
            </div>

            {/* Social Links - spans full width on mobile, 3 cols on desktop */}
            <div
              className="md:col-span-2 lg:col-span-3 animate-fade-in"
              style={{ animationDelay: "300ms", opacity: 0 }}
            >
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-6">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} · Hecho con{" "}
              <span className="text-primary">♥</span> por Tu Nombre
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
