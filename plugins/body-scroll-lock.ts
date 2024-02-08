declare module 'body-scroll-lock' {
    interface bodyScrollOptions {
        reserveScrollBarGap?: boolean;
        allowTouchMove?: (el: HTMLElement) => boolean;
    }

    export function disableBodyScroll(targetElement: HTMLElement, options?: bodyScrollOptions): void;
    export function enableBodyScroll(targetElement: HTMLElement): void;
    export function clearAllBodyScrollLocks(): void;

}