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
  currentFrame: number;
  containerRef: React.RefObject<HTMLDivElement>;
  animationData: AnimationItem | null;
}

const isLottieFile = (src: string): boolean => {
  const extension = src.split('.').pop()?.toLowerCase();
  return extension === 'lottie';
};

const fetchAnimationData = async (src: string): Promise<object | string> => {
  if (isLottieFile(src)) {
    const { entries } = await unzip(src);
    
    let manifest = null;
    let animationData = null;
    
    for (const entry of Object.values(entries)) {
      const name = entry.name.toLowerCase();
      if (name === 'manifest.json') {
        manifest = await entry.json();
      } else if (name.endsWith('.json')) {
        animationData = await entry.json();
      }
    }
    
    if (manifest && animationData) {
      const animationUrl = (manifest as { animations?: Array<{ id: string; file: string }> }).animations?.[0]?.file;
      if (animationUrl) {
        for (const entry of Object.values(entries)) {
          if (entry.name === animationUrl) {
            return await entry.json();
          }
        }
      }
    }
    
    if (animationData) {
      return animationData;
    }
    
    throw new Error('Invalid .lottie file: no animation data found');
  }
  
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Failed to fetch animation: ${response.statusText}`);
  }
  
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json') || src.endsWith('.json')) {
    return await response.json();
  }
  
  return src;
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const srcRef = useRef(src);
  const callbacksRef = useRef({ onLoad, onError, onComplete, onLoopComplete, onFrame, onEnterFrame });

  useEffect(() => {
    srcRef.current = src;
  }, [src]);

  useEffect(() => {
    callbacksRef.current = { onLoad, onError, onComplete, onLoopComplete, onFrame, onEnterFrame };
  }, [onLoad, onError, onComplete, onLoopComplete, onFrame, onEnterFrame]);

  useEffect(() => {
    if (!src || !containerRef.current) return;

    let animation: AnimationItem | null = null;
    let destroyed = false;

    const loadAnimation = async () => {
      try {
        if (destroyed) return;

        const animationData = await fetchAnimationData(srcRef.current);

        if (destroyed || !containerRef.current) return;

        if (animationRef.current) {
          animationRef.current.destroy();
          animationRef.current = null;
        }

        const config = {
          container: containerRef.current!,
          renderer: 'svg' as const,
          loop,
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

        animation.setSpeed(speed);
        animation.setDirection(direction);

        if (backgroundColor !== 'transparent') {
          const container = containerRef.current;
          if (container) {
            container.style.backgroundColor = backgroundColor;
          }
        }

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
          setCurrentFrame(frame);
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
          setCurrentFrame(0);
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
  }, [src, loop, speed, direction, backgroundColor, autoplay]);

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

  const destroy = useCallback(() => {
    animationRef.current?.destroy();
    animationRef.current = null;
    setIsLoaded(false);
    setIsPlaying(false);
    setCurrentFrame(0);
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
    currentFrame,
    containerRef,
    animationData: animationRef.current,
  };
}
