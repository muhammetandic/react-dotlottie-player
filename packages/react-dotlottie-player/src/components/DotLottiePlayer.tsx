import React, { forwardRef } from 'react';
import { useDotLottie } from '../hooks/useDotLottie';
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
      onLoad,
      onError,
      onComplete,
      onLoopComplete,
      onFrame,
      onEnterFrame,
    },
    ref
  ) => {
    const { containerRef } = useDotLottie({
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

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        id={id}
        className={className}
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
