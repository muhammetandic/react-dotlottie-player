import { TabGroup } from "./TabGroup";
import { CodeBlock } from "./CodeBlock";

export function UsageSection() {
  return (
    <section id="usage" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Usage</span>
          <h2 className="section-title">Simple by design.</h2>
          <p className="section-desc">
            Start with a single prop, then reach for callbacks or the imperative
            API when you need them.
          </p>
        </div>

        <div className="panel usage-panel">
          <TabGroup tabs={["Basic", "Callbacks", "Imperative"]} defaultTab="Basic" label="Usage example">
            <CodeBlock>{`import { DotLottiePlayer } from '@mhmmt/react-dotlottie-player';

export function App() {
  return (
    <DotLottiePlayer
      src="/animation.lottie"
      loop
      autoplay
      aria-label="Loading animation"
      style={{ width: 240, height: 240 }}
    />
  );
}`}</CodeBlock>

            <CodeBlock>{`import { DotLottiePlayer } from '@mhmmt/react-dotlottie-player';

export function App() {
  return (
    <DotLottiePlayer
      src="/animation.json"
      loop
      autoplay
      onLoad={() => console.log('Loaded')}
      onLoopComplete={() => console.log('Loop finished')}
      onError={(error) => console.error(error)}
    />
  );
}`}</CodeBlock>

            <CodeBlock>{`import { useRef } from 'react';
import {
  DotLottiePlayer,
  type DotLottiePlayerRef,
} from '@mhmmt/react-dotlottie-player';

export function App() {
  const player = useRef<DotLottiePlayerRef>(null);

  return (
    <>
      <DotLottiePlayer
        src="/animation.lottie"
        loop
        playerRef={player}
      />
      <button onClick={() => player.current?.play()}>Play</button>
      <button onClick={() => player.current?.pause()}>Pause</button>
      <button onClick={() => player.current?.setSpeed(2)}>2× speed</button>
    </>
  );
}`}</CodeBlock>
          </TabGroup>
        </div>

        <p className="usage-note">
          The player fills its container — size it with <code>style</code>, a{" "}
          <code>className</code> or a wrapping element.
        </p>
      </div>
    </section>
  );
}
