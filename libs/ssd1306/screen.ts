/**
 * Basic screen display functionalities
 */
//% color="#FF9933" weight=50 icon="\uf120"
//% groups='["Screen", "More"]'
namespace screen {
    const textOffset = 4;
    const lineOffset = 2;

    const screenHeight = 64;
    const screenWidth = 64;

    /**
     * Gets the text line height
     */
    export function lineHeight(): number {
        return 8
    }

    /**
     * Number of lines
     */
    export function lineCount(): number {
        return ((screenHeight - textOffset) / lineHeight()) >> 0
    }

    /**
     * Show text on the screen at a specific line.
     * @param text the text to print on the screen, eg: "Hello world"
     * @param line the line number to print the text at (starting at 1), eg: 1
     */
    //% blockId=displayshowstring block="show string %text|at line %line"
    //% weight=98 inlineInputMode="inline" blockGap=8
    //% group="Screen"
    //% help=display/show-string
    export function showString(text: string, line: number) {
        // line indexing starts at 1.
        line = (line - 1) >> 0;
        const nlines = lineCount();
        if (line < 0 || line >= nlines) return; // out of screen
        
        const h = lineHeight();
        const y = textOffset + h * line;
        fillRect(0, y, screenWidth, h, PixelColor.Black); // clear background
        printString(text, PixelColor.White, 0, y)
    }

    /**
     * Shows a number on the screen
     * @param value the numeric value
     * @param line the line number to print the text at (starting at 1), eg: 1
     */
    //% blockId=displayshownumber block="show number %name|at line %line"
    //% weight=96 inlineInputMode="inline" blockGap=8
    //% group="Screen"
    //% help=display/show-number
    //% line.min=1 line.max=10
    export function showNumber(value: number, line: number) {
        showString("" + value, line);
    }

    /**
     * Shows a name, value pair on the screen
     * @param value the numeric value
     * @param line the line number to print the text at (starting at 1), eg: 1
     */
    //% blockId=displayshowvalue block="show value %name|: %text|at line %line"
    //% weight=94 inlineInputMode="inline" blockGap=8
    //% group="Screen"
    //% help=display/show-value
    //% line.min=1 line.max=10
    export function showValue(name: string, value: number, line: number) {
        value = Math.round(value * 1000) / 1000;
        showString((name ? name + ": " : "") + value, line);
    }

    /**
     * Clear the screen
     */
    //% blockId=displayclear block="clear display"
    //% weight=90
    //% group="Screen"
    //% help=display/clear
    export function clear() {
        fillScreen(PixelColor.Black)
    }
}


