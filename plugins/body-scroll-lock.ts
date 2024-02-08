declare module 'body-scroll-lock' {
    interface bodyScrollOptions {
        reserveScrollBarGap?: boolean | undefined;
        allowTouchMove?: ((el: HTMLElement | Element) => boolean) | undefined;
    }

    export function disableBodyScroll(targetElement: HTMLElement | Element, options?: bodyScrollOptions): void;
    export function enableBodyScroll(targetElement: HTMLElement | Element): void;
    export function clearAllBodyScrollLocks(): void;

}