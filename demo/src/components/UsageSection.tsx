import { CodeBlock } from "./CodeBlock";

export function UsageSection() {
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
