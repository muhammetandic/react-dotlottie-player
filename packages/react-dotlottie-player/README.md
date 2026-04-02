# React DotLottie Player

Play Lottie animations in React — supports both `.json` and `.lottie` files.

## Features

- Play `.json` Lottie animations
- Play `.lottie` animations (automatically unzips)
- SSR-safe with dynamic import
- Full TypeScript support
- Tree-shakeable exports

## Installation

```bash
npm install react-dotlottie-player
```

## Peer Dependencies

```bash
npm install react react-dom
```

## Usage

```tsx
import { DotLottiePlayer } from 'react-dotlottie-player';

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
| `onLoad` | `() => void` | - | Callback when animation loads |
| `onError` | `(error: Error) => void` | - | Callback on error |
| `onComplete` | `() => void` | - | Callback when animation completes |
| `onLoopComplete` | `() => void` | - | Callback when loop completes |
| `onFrame` | `(frame: number) => void` | - | Callback on each frame |

## License

MIT
