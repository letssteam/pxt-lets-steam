declare const enum PixelColor {
    Black = 0,
    White = 1
}

namespace pxsim.screen{
    export function printString(str: string, color: PixelColor, x: number, y: number): void{}

    export function fillScreen(color: PixelColor): void{}

    export function clearScreen(): void{}

    export function setPixel(x: number, y: number, color: PixelColor): void{}

    export function invertScreen(invert: boolean): void{}
}