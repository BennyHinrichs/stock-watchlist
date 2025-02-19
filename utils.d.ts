import { type ClassValue } from "clsx";
import type { TransitionConfig } from "svelte/transition";
export declare function cn(...inputs: ClassValue[]): string;
type FlyAndScaleParams = {
    y?: number;
    x?: number;
    start?: number;
    duration?: number;
};
export declare const flyAndScale: (node: Element, params?: FlyAndScaleParams) => TransitionConfig;
export declare function splitArrayAtDelimiters<T, U extends T>(arr: T[], delimiter: U): T[][];
export {};
