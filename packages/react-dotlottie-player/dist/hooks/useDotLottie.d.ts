import type { AnimationItem } from 'lottie-web';
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
export declare function useDotLottie({ src, loop, autoplay, speed, direction, backgroundColor, onLoad, onError, onComplete, onLoopComplete, onFrame, onEnterFrame, }: UseDotLottieOptions): UseDotLottieReturn;
export {};
