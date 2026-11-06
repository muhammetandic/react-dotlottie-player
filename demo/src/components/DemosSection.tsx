import { DemoCard } from "./DemoCard";
import { Reveal } from "./Reveal";

const demos = [
  {
    title: "JSON animation",
    description:
      "A standard Lottie .json file with loop, speed and pause controls.",
    src: "./samples/travel.json",
  },
  {
    title: "Lottie archive",
    description:
      "The same animation packaged as a compressed .lottie archive.",
    src: "./samples/travel.lottie",
  },
  {
    title: "Bundled assets",
    description:
      "A richer scene whose images are extracted from the archive at runtime.",
    src: "./samples/15-million-people-world.lottie",
  },
];

export function DemosSection() {
  return (
    <section id="demos" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Playground</span>
          <h2 className="section-title">Try it, right here.</h2>
          <p className="section-desc">
            Every control below drives the real component — no screenshots.
          </p>
        </div>

        <div className="demo-grid">
          {demos.map((demo, index) => (
            <Reveal key={demo.src} delay={index * 80}>
              <DemoCard {...demo} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
