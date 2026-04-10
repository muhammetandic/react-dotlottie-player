import { useState } from "react";
import { DotLottiePlayer } from "@mhmmt/react-dotlottie-player";

interface DemoCardProps {
  title: string;
  description: string;
  src: string;
  showLoop?: boolean;
  showSpeed?: boolean;
  defaultLoop?: boolean;
  defaultAutoplay?: boolean;
}

export function DemoCard({
  title,
  description,
  src,
  showLoop = false,
  showSpeed = false,
  defaultLoop = false,
  defaultAutoplay = true,
}: DemoCardProps) {
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
