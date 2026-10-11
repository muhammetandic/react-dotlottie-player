import { forwardRef, useImperativeHandle } from 'react';
import { useDotLottie } from '../hooks/useDotLottie';
import { useMergeRefs } from '../hooks/useMergeRefs';
import type { DotLottiePlayerProps } from '../types';

export const DotLottiePlayer = forwardRef<HTMLDivElement, DotLottiePlayerProps>(
  (
    {
      src,
      loop = false,
      autoplay = true,
      speed = 1,
      direction = 1,
      backgroundColor = 'transparent',
      id,
      className,
      style,
      role = 'img',
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden,
      playerRef,
      onLoad,
      onError,
      onComplete,
      onLoopComplete,
      onFrame,
      onEnterFrame,
    },
    ref
  ) => {
    const {
      containerRef,
      play,
      pause,
      stop,
      goToFrame,
      setSpeed,
      setDirection,
      setSubframe,
      getDuration,
      getCurrentFrame,
      getAnimation,
      destroy,
      isLoaded,
      isPlaying,
    } = useDotLottie({
      src,
      loop,
      autoplay,
      speed,
      direction,
      backgroundColor,
      onLoad,
      onError,
      onComplete,
      onLoopComplete,
      onFrame,
      onEnterFrame,
    });

    useImperativeHandle(
      playerRef,
      () => ({
        play,
        pause,
        stop,
        goToFrame,
        setSpeed,
        setDirection,
        setSubframe,
        getDuration,
        getCurrentFrame,
        getAnimation,
        destroy,
        isLoaded,
        isPlaying,
      }),
      [
        play,
        pause,
        stop,
        goToFrame,
        setSpeed,
        setDirection,
        setSubframe,
        getDuration,
        getCurrentFrame,
        getAnimation,
        destroy,
        isLoaded,
        isPlaying,
      ]
    );

    // Give the hook its container ref while still forwarding the consumer's
    // `ref` to the same element. `useMergeRefs` keeps the callback stable and
    // works identically on React 18 and 19.
    const mergedRef = useMergeRefs<HTMLDivElement>(containerRef, ref);

    return (
      <div
        ref={mergedRef}
        id={id}
        className={className}
        role={role}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}
      />
    );
  }
);

DotLottiePlayer.displayName = 'DotLottiePlayer';
