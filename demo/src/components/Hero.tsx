import { DotLottiePlayer } from "@mhmmt/react-dotlottie-player";
import { useCopy } from "../hooks/useCopy";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  FileIcon,
  ReactIcon,
  SparklesIcon,
} from "./Icons";

const installCommand = "npm install @mhmmt/react-dotlottie-player";

export function Hero() {
  const { copied, copy } = useCopy();

  return (
    <header className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-badge">
            <span className="pulse-dot" />
            v0.1.6 · now on npm
          </span>

          <h1>
            Lottie animations,
            <br />
            <span className="gradient-text">beautifully simple</span> in React.
          </h1>

          <p className="hero-lead">
            One component for both <code>.json</code> and <code>.lottie</code> files.
            TypeScript-first, accessible by default, and packed with imperative
            playback controls.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#installation">
              Get started
              <ArrowUpRightIcon width={16} height={16} />
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/muhammetandic/react-dotlottie-player"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
          </div>

          <div className="install-strip">
            <span className="install-prompt" aria-hidden>
              $
            </span>
            <code>{installCommand}</code>
            <button
              type="button"
              className="install-copy"
              onClick={() => copy(installCommand)}
              aria-label={copied ? "Copied install command" : "Copy install command"}
            >
              {copied ? <CheckIcon width={15} height={15} /> : <CopyIcon width={15} height={15} />}
            </button>
          </div>

          <ul className="hero-meta">
            <li>
              <ReactIcon width={15} height={15} />
              React 18 &amp; 19
            </li>
            <li>
              <SparklesIcon width={15} height={15} />
              TypeScript
            </li>
            <li>
              <FileIcon width={15} height={15} />
              .json + .lottie
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="hero-glow" aria-hidden />
          <div className="hero-card">
            <div className="hero-card-inner">
              <div className="hero-card-head">
                <div className="window-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                <span className="live-pill">
                  <span className="pulse-dot" />
                  Live preview
                </span>
              </div>

              <div className="hero-player">
                <DotLottiePlayer
                  src="./samples/travel.lottie"
                  loop
                  autoplay
                  aria-label="Animated travel illustration"
                />
              </div>

              <div className="hero-card-foot">
                <span className="format-badge">.lottie</span>
                <code>travel.lottie</code>
                <span className="hero-card-size">116 KB</span>
              </div>
            </div>
          </div>

          <div className="float-chip chip-one" aria-hidden>
            <span className="chip-dot" />
            60 fps
          </div>
          <div className="float-chip chip-two" aria-hidden>
            <span className="format-badge">.json</span>
            zero config
          </div>
        </div>
      </div>
    </header>
  );
}
