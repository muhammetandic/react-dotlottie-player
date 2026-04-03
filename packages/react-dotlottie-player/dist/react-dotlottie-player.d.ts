import React$1 from 'react';

interface DotLottiePlayerProps {
    src: string;
    loop?: boolean;
    autoplay?: boolean;
    speed?: number;
    direction?: 1 | -1;
    backgroundColor?: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    onLoad?: () => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
    onLoopComplete?: () => void;
    onFrame?: (frame: number) => void;
    onEnterFrame?: (frame: number) => void;
}

declare const DotLottiePlayer: React$1.ForwardRefExoticComponent<DotLottiePlayerProps & React$1.RefAttributes<HTMLDivElement>>;

export { DotLottiePlayer };
export type { DotLottiePlayerProps };
