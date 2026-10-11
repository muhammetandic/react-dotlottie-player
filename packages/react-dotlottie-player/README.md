# React DotLottie Player

Play Lottie animations in React — supports both `.json` and `.lottie` files.

## Installation

```bash
npm install @mhmmt/react-dotlottie-player
```

## Requirements

React 18 or 19. The published build starts with the `"use client"` directive, so
the component can be rendered directly from a React Server Component / Next.js
App Router tree.

## Usage

```tsx
import { DotLottiePlayer } from '@mhmmt/react-dotlottie-player';

function App() {
  return (
    <DotLottiePlayer
      src="/animation.json"
      loop
      autoplay
      speed={1}
      onLoad={() => console.log('Animation loaded')}
      onError={(error) => console.error('Error:', error)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | URL to `.json` or `.lottie` file |
| `loop` | `boolean` | `false` | Loop animation |
| `autoplay` | `boolean` | `true` | Auto-play on load |
| `speed` | `number` | `1` | Playback speed |
| `direction` | `1 \| -1` | `1` | Playback direction |
| `backgroundColor` | `string` | `'transparent'` | Background color |
| `id` | `string` | - | Container element id |
| `className` | `string` | - | Container class name |
| `style` | `React.CSSProperties` | - | Inline styles for the container |
| `role` | `React.AriaRole` | `'img'` | Accessible role for the container |
| `aria-label` | `string` | - | Accessible label for the animation |
| `aria-hidden` | `boolean` | - | Hide from assistive tech (decorative animations) |
| `playerRef` | `Ref<DotLottiePlayerRef>` | - | Imperative playback controls (see below) |
| `onLoad` | `() => void` | - | Callback when animation loads |
| `onError` | `(error: Error) => void` | - | Callback on error |
| `onComplete` | `() => void` | - | Callback when animation completes |
| `onLoopComplete` | `() => void` | - | Callback when loop completes |
| `onFrame` | `(frame: number) => void` | - | Callback on each frame |
| `onEnterFrame` | `(frame: number) => void` | - | Callback on each frame (alias of `onFrame`) |

## Imperative controls

Pass a `playerRef` to control playback from your own code. It exposes
`play`, `pause`, `stop`, `goToFrame`, `setSpeed`, `setDirection`,
`setSubframe`, `getDuration`, `getCurrentFrame`, `getAnimation`, `destroy`,
`isLoaded` and `isPlaying`.

```tsx
import { useRef } from 'react';
import {
  DotLottiePlayer,
  type DotLottiePlayerRef,
} from '@mhmmt/react-dotlottie-player';

function App() {
  const player = useRef<DotLottiePlayerRef>(null);

  return (
    <>
      <DotLottiePlayer src="/animation.json" autoplay={false} playerRef={player} />
      <button onClick={() => player.current?.play()}>Play</button>
      <button onClick={() => player.current?.pause()}>Pause</button>
      <button onClick={() => player.current?.goToFrame(30)}>Go to frame 30</button>
    </>
  );
}
```

## License

MIT
