import { useState } from "react";
import { DotLottiePlayer } from "@mhmmt/react-dotlottie-player";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import dark from "react-syntax-highlighter/dist/esm/styles/prism/dark";

function CodeBlock({
  children,
  language = "tsx",
}: {
  children: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <SyntaxHighlighter
        language={language}
        style={dark}
        customStyle={{
          margin: "1rem 0",
          borderRadius: "8px",
          fontSize: "0.75rem",
          background: "#0f0f1a",
        }}
      >
        {children}
      </SyntaxHighlighter>
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="nav-brand">
          <span>@mhmmt</span>/react-dotlottie-player
        </div>
        <div className="nav-links">
          <a href="#installation">Installation</a>
          <a href="#usage">Usage</a>
          <a href="#demos">Demos</a>
          <a href="#props">Props</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="container">
        <div className="hero-badge">v0.1.0</div>
        <h1>React DotLottie Player</h1>
        <p>
          Play Lottie animations in React — supports both <code>.json</code> and{" "}
          <code>.lottie</code> files
        </p>
      </div>
    </header>
  );
}

function InstallationSection() {
  return (
    <section id="installation" className="section">
      <div className="container">
        <h2 className="section-title">Installation</h2>
        <p className="section-desc">Get started in seconds</p>

        <div className="card">
          <div className="install-options">
            <div className="install-option">
              <span className="install-label">npm</span>
              <CodeBlock language="bash">
                npm install @mhmmt/react-dotlottie-player
              </CodeBlock>
            </div>
            <div className="install-option">
              <span className="install-label">pnpm</span>
              <CodeBlock language="bash">
                pnpm add @mhmmt/react-dotlottie-player
              </CodeBlock>
            </div>
            <div className="install-option">
              <span className="install-label">yarn</span>
              <CodeBlock language="bash">
                yarn add @mhmmt/react-dotlottie-player
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className="card">
          <p style={{ color: "var(--text-muted)" }}>
            No additional configuration required. The package works out of the
            box.
          </p>
        </div>
      </div>
    </section>
  );
}

function UsageSection() {
  return (
    <section id="usage" className="section">
      <div className="container">
        <h2 className="section-title">Usage</h2>
        <p className="section-desc">Simple and intuitive API</p>

        <div className="card">
          <h3>Basic Example</h3>
          <CodeBlock>{`import { DotLottiePlayer } from '@mhmmt/react-dotlottie-player';

function App() {
  return (
    <DotLottiePlayer
      src="/animation.json"
      loop
      autoplay
    />
  );
}`}</CodeBlock>
        </div>

        <div className="card">
          <h3>With Callbacks</h3>
          <CodeBlock>{`function App() {
  return (
    <DotLottiePlayer
      src="/animation.json"
      loop
      autoplay
      onLoad={() => console.log('Loaded!')}
      onComplete={() => console.log('Finished!')}
      onError={(error) => console.error(error)}
    />
  );
}`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}

function DemoCard({
  title,
  description,
  src,
  showLoop = false,
  showSpeed = false,
  defaultLoop = false,
  defaultAutoplay = true,
}: {
  title: string;
  description: string;
  src: string;
  showLoop?: boolean;
  showSpeed?: boolean;
  defaultLoop?: boolean;
  defaultAutoplay?: boolean;
}) {
  const [loop, setLoop] = useState(defaultLoop);
  const [autoplay, setAutoplay] = useState(defaultAutoplay);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="demo-card">
      <div className="demo-preview">
        <DotLottiePlayer
          src={src}
          loop={loop}
          autoplay={autoplay}
          speed={speed}
          style={{ width: 150, height: 150 }}
        />
      </div>
      <div className="demo-info">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="controls">
          <label>
            <input
              type="checkbox"
              checked={autoplay}
              onChange={(e) => setAutoplay(e.target.checked)}
            />
            Autoplay
          </label>
          {showLoop && (
            <label>
              <input
                type="checkbox"
                checked={loop}
                onChange={(e) => setLoop(e.target.checked)}
              />
              Loop
            </label>
          )}
          {showSpeed && (
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

function DemosSection() {
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

function PropsSection() {
  const props = [
    {
      name: "src",
      type: "string",
      required: true,
      desc: "URL to .json or .lottie file",
    },
    {
      name: "loop",
      type: "boolean",
      default: "false",
      desc: "Loop animation playback",
    },
    {
      name: "autoplay",
      type: "boolean",
      default: "true",
      desc: "Auto-play when loaded",
    },
    {
      name: "speed",
      type: "number",
      default: "1",
      desc: "Playback speed multiplier",
    },
    {
      name: "direction",
      type: "1 | -1",
      default: "1",
      desc: "Playback direction",
    },
    {
      name: "backgroundColor",
      type: "string",
      default: "'transparent'",
      desc: "Container background",
    },
    {
      name: "onLoad",
      type: "() => void",
      desc: "Callback when animation loads",
    },
    {
      name: "onError",
      type: "(error: Error) => void",
      desc: "Callback on error",
    },
    {
      name: "onComplete",
      type: "() => void",
      desc: "Callback when animation completes",
    },
    {
      name: "onLoopComplete",
      type: "() => void",
      desc: "Callback when loop completes",
    },
    {
      name: "onFrame",
      type: "(frame: number) => void",
      desc: "Callback on each frame",
    },
  ];

  return (
    <section id="props" className="section">
      <div className="container">
        <h2 className="section-title">Props</h2>
        <p className="section-desc">All available component props</p>

        <div className="card">
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop) => (
                <tr key={prop.name}>
                  <td>
                    <code>{prop.name}</code>
                  </td>
                  <td>
                    <span className="type-tag">{prop.type}</span>
                  </td>
                  <td>{prop.default || "—"}</td>
                  <td>{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <p>
          Built by <a href="https://github.com/muhammetandic">@muhammetandic</a>{" "}
          •
          <a href="https://github.com/muhammetandic/react-dotlottie-player">
            {" "}
            View on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

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
