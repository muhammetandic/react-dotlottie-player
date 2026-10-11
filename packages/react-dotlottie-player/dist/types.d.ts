import type { AnimationItem } from 'lottie-web';
/**
 * Imperative controls exposed through the `playerRef` prop of
 * `DotLottiePlayer`.
 */
export interface DotLottiePlayerRef {
    /** Start or resume playback. */
    play: () => void;
    /** Pause playback, keeping the current frame. */
    pause: () => void;
    /** Stop playback and reset to the first frame. */
    stop: () => void;
    /** Jump to a specific frame (or time when `isFrame` is false). */
    goToFrame: (frame: number, isFrame?: boolean) => void;
    /** Set the playback speed multiplier. */
    setSpeed: (speed: number) => void;
    /** Set the playback direction. */
    setDirection: (direction: 1 | -1) => void;
    /** Enable or disable subframe rendering. */
    setSubframe: (useSubFrame: boolean) => void;
    /** Duration in frames, or in seconds when `inFrames` is false. */
    getDuration: (inFrames?: boolean) => number;
    /** Current frame at the time of the call. */
    getCurrentFrame: () => number;
    /** The underlying lottie `AnimationItem`, or null before it loads. */
    getAnimation: () => AnimationItem | null;
    /** Tear down the animation and release resources. */
    destroy: () => void;
    /** Whether the animation has loaded. */
    isLoaded: boolean;
    /** Whether the animation is currently playing. */
    isPlaying: boolean;
}
export interface DotLottiePlayerProps {
    src: string;
    loop?: boolean;
    autoplay?: boolean;
    speed?: number;
    direction?: 1 | -1;
    backgroundColor?: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Accessible role for the container element. Defaults to `"img"`.
     */
    role?: React.AriaRole;
    /** Accessible label describing the animation. */
    'aria-label'?: string;
    /**
     * Set to `true` when the animation is purely decorative, so it is hidden from
     * assistive technology.
     */
    'aria-hidden'?: boolean;
    /**
     * Ref that receives imperative playback controls. Unlike `ref` (which points
     * at the container element), this exposes `play`, `pause`, `goToFrame`, etc.
     */
    playerRef?: React.Ref<DotLottiePlayerRef>;
    onLoad?: () => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
    onLoopComplete?: () => void;
    onFrame?: (frame: number) => void;
    onEnterFrame?: (frame: number) => void;
}
