import {
  Navigation,
  Hero,
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
      <Hero />
      <InstallationSection />
      <UsageSection />
      <DemosSection />
      <PropsSection />
      <Footer />
    </div>
  );
}

export default App;
