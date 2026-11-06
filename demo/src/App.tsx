import {
  Navigation,
  Hero,
  FeaturesSection,
  InstallationSection,
  UsageSection,
  DemosSection,
  PropsSection,
  Footer,
} from "./components";

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <FeaturesSection />
        <InstallationSection />
        <UsageSection />
        <DemosSection />
        <PropsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
