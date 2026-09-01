import { useEffect, useRef, useState, useCallback } from 'react';
import lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';
import { unzip } from 'unzipit';

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
  containerRef: React.RefObject<HTMLDivElement | null>;
  animationData: AnimationItem | null;
}

const isLottieFile = (src: string): boolean => {
  const path = src.split(/[?#]/)[0];
  const extension = path.split('.').pop()?.toLowerCase();
  return extension === 'lottie';
};

const fetchAnimationData = async (src: string, objectUrls: string[]): Promise<object> => {
  if (isLottieFile(src)) {
    const { entries } = await unzip(src);
    
    let manifest = null;
    let animationData: any = null;
    
    for (const entry of Object.values(entries)) {
      const name = entry.name.toLowerCase();
      if (name === 'manifest.json') {
        manifest = await entry.json();
      } else if (name.endsWith('.json')) {
        animationData = await entry.json();
      }
    }
    
    if (manifest) {
      const animationUrl = (manifest as { animations?: Array<{ id: string; file: string }> }).animations?.[0]?.file;
      if (animationUrl) {
        for (const entry of Object.values(entries)) {
          if (entry.name === animationUrl) {
            animationData = await entry.json();
            break;
          }
        }
      }
    }
    
    if (!animationData) {
      throw new Error('Invalid .lottie file: no animation data found');
    }

    if (animationData.assets && Array.isArray(animationData.assets)) {
      for (const asset of animationData.assets) {
        if (asset.p && typeof asset.p === 'string') {
          const imageEntry = Object.values(entries).find(e => e.name.endsWith(asset.p));
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

  return await response.json();
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
      try {
        if (destroyed) return;

        objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        objectUrlsRef.current = [];

        const animationData = await fetchAnimationData(srcRef.current, objectUrlsRef.current);

        if (destroyed || !containerRef.current) return;

        if (animationRef.current) {
          animationRef.current.destroy();
          animationRef.current = null;
        }

        const config = {
          container: containerRef.current!,
          renderer: 'svg' as const,
          autoplay: false,
          animationData,
          rendererSettings: {
            clearCanvas: true,
            contextCare: true,
            progressiveDraw: true,
          },
        };

        animation = lottie.loadAnimation(config as Parameters<typeof lottie.loadAnimation>[0]);
        animationRef.current = animation;

        applyLiveConfig(configRef.current);

        animation.addEventListener('DOMLoaded', () => {
          setIsLoaded(true);
          callbacksRef.current.onLoad?.();

          if (autoplay) {
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
          const frame = (e as { currentTime: number }).currentTime;
          currentFrameRef.current = frame;
          callbacksRef.current.onFrame?.(frame);
          callbacksRef.current.onEnterFrame?.(frame);
        });

        animation.addEventListener('play' as any, () => {
          setIsPlaying(true);
        });

        animation.addEventListener('pause' as any, () => {
          setIsPlaying(false);
        });

        animation.addEventListener('stop' as any, () => {
          setIsPlaying(false);
          currentFrameRef.current = 0;
        });

      } catch (error) {
        callbacksRef.current.onError?.(error as Error);
      }
    };

    loadAnimation();

    return () => {
      destroyed = true;
      animation?.destroy();
      animationRef.current = null;
      setIsLoaded(false);
      setIsPlaying(false);
    };
  }, [src, autoplay, applyLiveConfig]);

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
    containerRef,
    animationData: animationRef.current,
  };
}
