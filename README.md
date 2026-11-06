<div align="center">

# React DotLottie Player

A small, fully typed React component for playing [Lottie](https://airbnb.io/lottie/) animations — supports both `.json` and `.lottie` (DotLottie) files.

[![npm](https://img.shields.io/npm/v/@mhmmt/react-dotlottie-player?color=cb3837&label=npm)](https://www.npmjs.com/package/@mhmmt/react-dotlottie-player)
[![downloads](https://img.shields.io/npm/dm/@mhmmt/react-dotlottie-player)](https://www.npmjs.com/package/@mhmmt/react-dotlottie-player)
[![license](https://img.shields.io/npm/l/@mhmmt/react-dotlottie-player?color=blue)](./LICENSE)
[![react](https://img.shields.io/badge/react-18%20%7C%2019-149eca)](https://react.dev)
[![demo](https://img.shields.io/badge/demo-live-2ea44f)](https://muhammetandic.github.io/react-dotlottie-player/)

[**Live demo**](https://muhammetandic.github.io/react-dotlottie-player/) · [**npm**](https://www.npmjs.com/package/@mhmmt/react-dotlottie-player) · [**Issues**](https://github.com/muhammetandic/react-dotlottie-player/issues)

</div>

## Features

- 🎞️ Plays both **`.json`** (Lottie) and **`.lottie`** (DotLottie) files
- ⚛️ Works with **React 18 and 19**, including Server Components / Next.js App Router (`"use client"` is included in the build)
- 🧠 **Full TypeScript** types — no `any` in the public API
- 🎮 **Imperative controls** via `playerRef` — play, pause, stop, seek, speed, direction
- 🎯 **Lifecycle callbacks** — `onLoad`, `onComplete`, `onLoopComplete`, `onFrame`, `onError`
- ♿ **Accessibility** props — `role`, `aria-label`, `aria-hidden`
- 🪶 A thin component built on `lottie-web`, with no extra wrapper dependencies

## Installation

```bash
npm install @mhmmt/react-dotlottie-player
# or
pnpm add @mhmmt/react-dotlottie-player
# or
yarn add @mhmmt/react-dotlottie-player
```

## Usage

```tsx
import { DotLottiePlayer } from '@mhmmt/react-dotlottie-player';

export function App() {
  return (
    <div style={{ width: 400, height: 400 }}>
      <DotLottiePlayer
        src="/animation.lottie"
        loop
        autoplay
        speed={1}
        aria-label="Animated illustration"
        onLoad={() => console.log('loaded')}
        onError={(error) => console.error(error)}
      />
    </div>
  );
}
```

> The player fills its parent, so give the container an explicit size
> (`width`/`height`), or pass them through `style`.

### `.json` vs `.lottie`

Both formats are supported and detected automatically:

```tsx
<DotLottiePlayer src="/animation.json" />
<DotLottiePlayer src="/animation.lottie" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | URL to a `.json` or `.lottie` file |
| `loop` | `boolean` | `false` | Loop the animation |
| `autoplay` | `boolean` | `true` | Start playing once loaded |
| `speed` | `number` | `1` | Playback speed multiplier |
| `direction` | `1 \| -1` | `1` | Playback direction |
| `backgroundColor` | `string` | `'transparent'` | Background color |
| `id` | `string` | – | Container element id |
| `className` | `string` | – | Container class name |
| `style` | `React.CSSProperties` | – | Inline styles for the container |
| `role` | `React.AriaRole` | `'img'` | Accessible role for the container |
| `aria-label` | `string` | – | Accessible label for the animation |
| `aria-hidden` | `boolean` | – | Hide decorative animations from assistive tech |
| `playerRef` | `React.Ref<DotLottiePlayerRef>` | – | Imperative controls (see below) |
| `onLoad` | `() => void` | – | Animation loaded |
| `onError` | `(error: Error) => void` | – | Loading or playback error |
| `onComplete` | `() => void` | – | Animation completed |
| `onLoopComplete` | `() => void` | – | A loop completed |
| `onFrame` | `(frame: number) => void` | – | Fired on each frame |
| `onEnterFrame` | `(frame: number) => void` | – | Alias of `onFrame` |

## Imperative controls

Pass a `playerRef` to drive playback from your own UI. The component's normal
`ref` still points at the container element.

```tsx
import { useRef } from 'react';
import {
  DotLottiePlayer,
  type DotLottiePlayerRef,
} from '@mhmmt/react-dotlottie-player';

export function Player() {
  const player = useRef<DotLottiePlayerRef>(null);

  return (
    <>
      <div style={{ width: 400, height: 400 }}>
        <DotLottiePlayer
          src="/animation.lottie"
          autoplay={false}
          playerRef={player}
        />
      </div>

      <button onClick={() => player.current?.play()}>Play</button>
      <button onClick={() => player.current?.pause()}>Pause</button>
      <button onClick={() => player.current?.stop()}>Stop</button>
      <button onClick={() => player.current?.goToFrame(30)}>Go to frame 30</button>
    </>
  );
}
```

`DotLottiePlayerRef` exposes:

`play`, `pause`, `stop`, `goToFrame(frame, isFrame?)`, `setSpeed`, `setDirection`,
`setSubframe`, `getDuration(inFrames?)`, `getCurrentFrame`, `getAnimation`,
`destroy`, plus the `isLoaded` and `isPlaying` flags.

## Accessibility

The container renders with `role="img"` by default. Provide an `aria-label` that
describes the animation, or set `aria-hidden` for purely decorative content.

## Requirements

- React **18** or **19**
- A browser environment (the component renders via `lottie-web`)

## Repository structure

```
.
├── packages/react-dotlottie-player   # the published npm package
├── demo                              # Vite + React demo (GitHub Pages)
└── .github/workflows                 # demo deploy + npm publish
```

## Development

```bash
npm install          # install the workspace
npm run dev:demo     # run the demo at http://localhost:5173
npm run build:package
```

## Links

- [Live demo](https://muhammetandic.github.io/react-dotlottie-player/)
- [npm package](https://www.npmjs.com/package/@mhmmt/react-dotlottie-player)
- [Package README](./packages/react-dotlottie-player/README.md)
- [Report an issue](https://github.com/muhammetandic/react-dotlottie-player/issues)

## License

[MIT](./LICENSE) © Muhammet Andić
