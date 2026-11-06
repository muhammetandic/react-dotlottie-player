import { Reveal } from "./Reveal";
import {
  AccessibilityIcon,
  CodeIcon,
  LayersIcon,
  ReactIcon,
  SlidersIcon,
  ZapIcon,
} from "./Icons";

const features = [
  {
    icon: LayersIcon,
    title: "Two formats, one API",
    description:
      "Load .json and .lottie files the same way. Bundled images and assets are extracted automatically.",
  },
  {
    icon: CodeIcon,
    title: "TypeScript-first",
    description:
      "Typed props, callbacks and refs. Autocomplete every option without reaching for the docs.",
  },
  {
    icon: SlidersIcon,
    title: "Imperative controls",
    description:
      "Play, pause, seek, change speed or reverse direction at any time through a simple player ref.",
  },
  {
    icon: AccessibilityIcon,
    title: "Accessible by default",
    description:
      "Sensible roles plus aria-label and aria-hidden props for meaningful or decorative animations.",
  },
  {
    icon: ReactIcon,
    title: "React 18 & 19 ready",
    description:
      "Built on forwardRef and stable hooks, so it works the same across both React majors.",
  },
  {
    icon: ZapIcon,
    title: "Small surface area",
    description:
      "One component and a predictable prop set. No configuration files, no provider, no setup.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="section features-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why this player</span>
          <h2 className="section-title">Everything you need. Nothing you don&apos;t.</h2>
          <p className="section-desc">
            A focused wrapper around lottie-web with the details handled for you,
            from archive extraction to cleanup.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={index * 60}>
                <article className="feature-card">
                  <span className="feature-icon">
                    <Icon width={20} height={20} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
