import { useRef, useState } from "react";
import {
  DotLottiePlayer,
  type DotLottiePlayerRef,
} from "@mhmmt/react-dotlottie-player";
import { PauseIcon, PlayIcon, RestartIcon } from "./Icons";

interface DemoCardProps {
  title: string;
  description: string;
  src: string;
  defaultLoop?: boolean;
  defaultAutoplay?: boolean;
}

const speeds = [0.5, 1, 1.5, 2];

export function DemoCard({
  title,
  description,
  src,
  defaultLoop = true,
  defaultAutoplay = true,
}: DemoCardProps) {
  const playerRef = useRef<DotLottiePlayerRef>(null);
  const [playing, setPlaying] = useState(defaultAutoplay);
  const [loop, setLoop] = useState(defaultLoop);
  const [speed, setSpeed] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const format = src.endsWith(".lottie") ? ".lottie" : ".json";
  const fileName = src.split("/").pop() ?? src;

  const restart = () => {
    playerRef.current?.stop();
    playerRef.current?.play();
    setPlaying(true);
  };

  return (
    <article className="demo-card">
      <div className="demo-preview">
        <div className="demo-preview-glow" aria-hidden />
        <span className="demo-format">{format}</span>

        {error ? (
          <div className="demo-state demo-error" role="alert">
            {error}
          </div>
        ) : (
          <div className="demo-player">
            <DotLottiePlayer
              playerRef={playerRef}
              src={src}
              autoplay={playing}
              loop={loop}
              speed={speed}
              aria-label={title}
              onLoad={() => setLoaded(true)}
              onComplete={() => {
                if (!loop) setPlaying(false);
              }}
              onError={(err) => setError(err.message)}
            />
          </div>
        )}

        {!loaded && !error && <span className="demo-state">Loading animation…</span>}
      </div>

      <div className="demo-info">
        <div className="demo-heading">
          <h3>{title}</h3>
          <code>{fileName}</code>
        </div>
        <p>{description}</p>

        <div className="demo-controls">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause animation" : "Play animation"}
            disabled={!loaded || Boolean(error)}
          >
            {playing ? <PauseIcon width={15} height={15} /> : <PlayIcon width={15} height={15} />}
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={restart}
            aria-label="Restart animation"
            disabled={!loaded || Boolean(error)}
          >
            <RestartIcon width={15} height={15} />
          </button>

          <div className="speed-group" role="group" aria-label="Playback speed">
            {speeds.map((value) => (
              <button
                key={value}
                type="button"
                className={speed === value ? "active" : ""}
                aria-pressed={speed === value}
                onClick={() => setSpeed(value)}
              >
                {value}×
              </button>
            ))}
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={loop}
              onChange={(event) => setLoop(event.target.checked)}
            />
            <span className="switch-track" aria-hidden>
              <span className="switch-thumb" />
            </span>
            Loop
          </label>
        </div>
      </div>
    </article>
  );
}
