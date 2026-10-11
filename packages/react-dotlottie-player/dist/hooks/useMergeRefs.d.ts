import { type Ref } from 'react';
/**
 * Merge one or more refs (object refs or callback refs) into a single callback
 * ref.
 *
 * The returned callback intentionally does **not** return a cleanup function,
 * so it behaves identically on React 18 (where a ref callback's return value is
 * ignored) and React 19 (where it would be treated as cleanup).
 */
export declare function useMergeRefs<T>(...refs: Array<Ref<T> | undefined>): (node: T | null) => void;
