import { DemoCard } from "./DemoCard";

export function DemosSection() {
  return (
    <section id="demos" className="section">
      <div className="container">
        <h2 className="section-title">Interactive Demos</h2>
        <p className="section-desc">Try it yourself with different options</p>

        <div className="demo-grid">
          <DemoCard
            title="JSON Animation"
            description="Standard Lottie .json file with loop and speed controls"
            src="./samples/travel.json"
            showLoop
            showSpeed
            defaultLoop
          />
          <DemoCard
            title="Lottie Animation"
            description="Compressed .lottie file with loop and speed controls"
            src="./samples/travel.lottie"
            showLoop
            showSpeed
            defaultLoop
          />
        </div>
      </div>
    </section>
  );
}
