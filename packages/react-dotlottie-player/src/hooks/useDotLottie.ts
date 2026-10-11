import { useEffect, useRef, useState, useCallback } from 'react';
import lottie from 'lottie-web';
import type { AnimationEventCallback, AnimationEventName, AnimationItem } from 'lottie-web';
import { unzip } from 'unzipit';

/** Minimal shape of a Lottie asset entry (image or precomp). */
interface LottieAsset {
  /** Asset path/name. */
  p?: string;
  /** Asset base path. */
  u?: string;
  [key: string]: unknown;
}

/** Minimal shape of the Lottie animation JSON this hook consumes. */
interface LottieAnimationData {
  assets?: LottieAsset[];
  [key: string]: unknown;
}

// lottie-web emits `play`/`pause`/`stop` at runtime, but its
// `AnimationEventName` union omits them. Confine the one necessary cast to this
// helper instead of using `as any` at every call site.
type LifecycleEvent = 'play' | 'pause' | 'stop';

const onLifecycle = (
  animation: AnimationItem,
  event: LifecycleEvent,
  handler: () => void
): void => {
  animation.addEventListener(event as AnimationEventName, handler as AnimationEventCallback);
};

interface UseDotLottieOptions {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  direction?: 1 | -1;
  backgroundColor?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  onFrame?: (frame: number) => void;
  onEnterFrame?: (frame: number) => void;
}

interface UseDotLottieReturn {
  play: () => void;
  pause: () => void;
  stop: () => void;
  goToFrame: (frame: number, isFrame?: boolean) => void;
  setSpeed: (speed: number) => void;
  setDirection: (direction: 1 | -1) => void;
  setSubframe: (useSubFrame: boolean) => void;
  getDuration: (inFrames?: boolean) => number;
  destroy: () => void;
  isLoaded: boolean;
  isPlaying: boolean;
  getCurrentFrame: () => number;
  getAnimation: () => AnimationItem | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const isLottieFile = (src: string): boolean => {
  const path = src.split(/[?#]/)[0];
  const extension = path.split('.').pop()?.toLowerCase();
  return extension === 'lottie';
};

const fetchAnimationData = async (
  src: string,
  objectUrls: string[]
): Promise<LottieAnimationData> => {
  if (isLottieFile(src)) {
    const { entries } = await unzip(src);
    
    const entryList = Object.values(entries);
    const normalizePath = (path: string): string =>
      path.replace(/\\/g, '/').replace(/^\.?\//, '').toLowerCase();

    const findEntry = (path: string) => {
      const target = normalizePath(path);
      const targetBase = target.split('/').pop();
      return (
        entryList.find((entry) => normalizePath(entry.name) === target) ??
        entryList.find((entry) => normalizePath(entry.name).split('/').pop() === targetBase)
      );
    };

    const manifestEntry = entryList.find(
      (entry) => normalizePath(entry.name) === 'manifest.json'
    );
    const manifest = manifestEntry
      ? ((await manifestEntry.json()) as { animations?: Array<{ id?: string; file?: string }> })
      : null;

    const animation = manifest?.animations?.[0];
    let animationData: LottieAnimationData | null = null;

    // Prefer the file declared in the manifest...
    if (animation?.file) {
      const fileEntry = findEntry(animation.file);
      if (fileEntry) animationData = await fileEntry.json();
    }

    // ...then the conventional `animations/<id>.json` path. Some manifests
    // (e.g. Lottielab) only declare an id and omit the `file` field.
    if (!animationData && animation?.id) {
      const idEntry = findEntry(`animations/${animation.id}.json`);
      if (idEntry) animationData = await idEntry.json();
    }

    // Deterministic fallback: first animation JSON, then first JSON in the archive.
    if (!animationData) {
      const jsonEntries = entryList
        .filter((entry) => {
          const name = normalizePath(entry.name);
          return name.endsWith('.json') && !name.endsWith('manifest.json');
        })
        .sort((a, b) => normalizePath(a.name).localeCompare(normalizePath(b.name)));
      const fallback =
        jsonEntries.find((entry) => normalizePath(entry.name).includes('animations/')) ??
        jsonEntries[0];
      if (fallback) animationData = await fallback.json();
    }

    if (!animationData) {
      throw new Error('Invalid .lottie file: no animation data found');
    }

    if (animationData.assets && Array.isArray(animationData.assets)) {
      for (const asset of animationData.assets) {
        if (asset.p && typeof asset.p === 'string') {
          const imageEntry = findEntry(`${asset.u ?? ''}${asset.p}`);
          if (imageEntry) {
            const blob = await imageEntry.blob();
            const objectUrl = URL.createObjectURL(blob);
            objectUrls.push(objectUrl);
            asset.p = objectUrl;
            asset.u = '';
          }
        }
      }
    }

    return animationData;
  }
  
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Failed to fetch animation: ${response.statusText}`);
  }

  return (await response.json()) as LottieAnimationData;
};

export function useDotLottie({
  src,
  loop = false,
  autoplay = true,
  speed = 1,
  direction = 1,
  backgroundColor = 'transparent',
  onLoad,
  onError,
  onComplete,
  onLoopComplete,
  onFrame,
  onEnterFrame,
}: UseDotLottieOptions): UseDotLottieReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentFrameRef = useRef(0);
  const srcRef = useRef(src);
  const callbacksRef = useRef({ onLoad, onError, onComplete, onLoopComplete, onFrame, onEnterFrame });
  const configRef = useRef({ loop, speed, direction });
  const autoplayRef = useRef(autoplay);

  useEffect(() => {
    srcRef.current = src;
  }, [src]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
    };
  }, []);

  useEffect(() => {
    callbacksRef.current = { onLoad, onError, onComplete, onLoopComplete, onFrame, onEnterFrame };
  }, [onLoad, onError, onComplete, onLoopComplete, onFrame, onEnterFrame]);

  const applyLiveConfig = useCallback((cfg: { loop: boolean; speed: number; direction: 1 | -1 }) => {
    const animation = animationRef.current;
    if (!animation) return;
    animation.loop = cfg.loop;
    animation.setSpeed(cfg.speed);
    animation.setDirection(cfg.direction);
  }, []);

  // Apply loop/speed/direction imperatively to the live animation instead of
  // reloading it — a full reload re-fetches src and restarts playback.
  useEffect(() => {
    configRef.current = { loop, speed, direction };
    applyLiveConfig({ loop, speed, direction });
  }, [loop, speed, direction, applyLiveConfig]);

  // `autoplay` drives the live animation and must not be a dependency of the
  // load effect — including it there re-fetches src and restarts playback on
  // every change. The ref also lets the DOMLoaded handler read the latest value.
  useEffect(() => {
    autoplayRef.current = autoplay;
    const animation = animationRef.current;
    if (!animation) return;
    if (autoplay) {
      animation.play();
    } else {
      animation.pause();
    }
  }, [autoplay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.style.backgroundColor = backgroundColor === 'transparent' ? '' : backgroundColor;
  }, [backgroundColor]);

  useEffect(() => {
    if (!src || !containerRef.current) return;

    let animation: AnimationItem | null = null;
    let destroyed = false;

    const loadAnimation = async () => {
      const localUrls: string[] = [];
      let committed = false;
      try {
        if (destroyed) return;

        objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        objectUrlsRef.current = [];

        const animationData = await fetchAnimationData(srcRef.current, localUrls);

        if (destroyed || !containerRef.current) return;

        // Take ownership of the object URLs only once this load is committed, so
        // that an aborted or failed load releases everything it created.
        objectUrlsRef.current = localUrls;
        committed = true;

        if (animationRef.current) {
          animationRef.current.destroy();
          animationRef.current = null;
        }

        const config = {
          container: containerRef.current!,
          renderer: 'svg' as const,
          autoplay: false,
          animationData,
        };

        animation = lottie.loadAnimation(config);
        animationRef.current = animation;

        applyLiveConfig(configRef.current);

        animation.addEventListener('DOMLoaded', () => {
          setIsLoaded(true);
          callbacksRef.current.onLoad?.();

          if (autoplayRef.current) {
            animation?.play();
          }
        });

        animation.addEventListener('complete', () => {
          setIsPlaying(false);
          callbacksRef.current.onComplete?.();
        });

        animation.addEventListener('loopComplete', () => {
          callbacksRef.current.onLoopComplete?.();
        });

        animation.addEventListener('enterFrame', (e) => {
          const frame = e.currentTime;
          currentFrameRef.current = frame;
          callbacksRef.current.onFrame?.(frame);
          callbacksRef.current.onEnterFrame?.(frame);
        });

        onLifecycle(animation, 'play', () => {
          setIsPlaying(true);
        });

        onLifecycle(animation, 'pause', () => {
          setIsPlaying(false);
        });

        onLifecycle(animation, 'stop', () => {
          setIsPlaying(false);
          currentFrameRef.current = 0;
        });

      } catch (error) {
        callbacksRef.current.onError?.(error as Error);
      } finally {
        if (!committed) {
          localUrls.forEach((url) => URL.revokeObjectURL(url));
        }
      }
    };

    loadAnimation();

    return () => {
      destroyed = true;
      animation?.destroy();
      animationRef.current = null;
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
      setIsLoaded(false);
      setIsPlaying(false);
    };
  }, [src, applyLiveConfig]);

  const play = useCallback(() => {
    animationRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    animationRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    animationRef.current?.stop();
  }, []);

  const goToFrame = useCallback((frame: number, isFrame = true) => {
    animationRef.current?.goToAndStop(frame, isFrame);
  }, []);

  const setSpeed = useCallback((newSpeed: number) => {
    animationRef.current?.setSpeed(newSpeed);
  }, []);

  const setDirection = useCallback((newDirection: 1 | -1) => {
    animationRef.current?.setDirection(newDirection);
  }, []);

  const setSubframe = useCallback((useSubFrame: boolean) => {
    animationRef.current?.setSubframe(useSubFrame);
  }, []);

  const getDuration = useCallback((inFrames = false) => {
    const anim = animationRef.current;
    if (!anim) return 0;
    return anim.getDuration(inFrames);
  }, []);

  const getCurrentFrame = useCallback(() => currentFrameRef.current, []);

  const getAnimation = useCallback(() => animationRef.current, []);

  const destroy = useCallback(() => {
    animationRef.current?.destroy();
    animationRef.current = null;
    setIsLoaded(false);
    setIsPlaying(false);
    currentFrameRef.current = 0;
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  }, []);

  return {
    play,
    pause,
    stop,
    goToFrame,
    setSpeed,
    setDirection,
    setSubframe,
    getDuration,
    destroy,
    isLoaded,
    isPlaying,
    getCurrentFrame,
    getAnimation,
    containerRef,
  };
}
