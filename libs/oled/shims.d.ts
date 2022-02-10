// Auto-generated. Do not edit.
declare namespace oled {

    /**
     * @brief Initialized screen
     *
     */
    //% group="More" advanced=true
    //% help=screen/ssd1306_init_screen
    //% blockId=ssd1306_init_screen block="Initialized screen on address %address, with width %width and height %height"
    //% parts="ssd1306" weight=95 address.defl=0x74 width.defl=128 height.defl=64 shim=oled::initScreen
    function initScreen(address?: AddressScreen, width?: uint16, height?: uint16): void;

    /**
     * @brief Print string on screen at the given position
     *
     * @param x pixel coordinate on X axis
     * @param y pixel coordinate on Y axis
     * @param str the string to print
     * @param color the color use to print on screen
     */
    //% group="More" advanced=true
    //% help=screen/printString
    //% blockId=print_string_ssd1306 block="print %str on screen in %color at x: %x|y: %y"
    //% parts="ssd1306" shim=oled::printString
    function printString(str: string, color: PixelColor, x: uint8, y: uint8): void;

    /**
     * @brief Fill the screen with specific color
     *
     * @param color the color use to fill the screen
     */
    //% group="More" advanced=true
    //% help=screen/fillScreen
    //% blockId=fill_screen_ssd1306 block="fill the screen in %color"
    //% parts="ssd1306" shim=oled::fillScreen
    function fillScreen(color: PixelColor): void;

    /**
     * @brief set the color of a specific pixel
     *
     * @param x the coordinate pixel on X axis
     * @param y the coordinate pixel on Y axis
     * @param color the color of the pixel
     */
    //% group="More" advanced=true
    //% help=screen/setPixel
    //% blockId=set_pixel_ssd1306 block="set pixel at %x, %y to %color"
    //% parts="ssd1306" shim=oled::setPixel
    function setPixel(x: uint8, y: uint8, color: PixelColor): void;

    /**
     * @brief Define if the screen should be inverted
     *
     * @param invert if True the screen is inverted, otherwise False
     */
    //% group="More" advanced=true
    //% help=screen/invertScreen
    //% blockId=invert_screen_ssd1306 block="invert the screen : %invert"
    //% parts="ssd1306" shim=oled::invertScreen
    function invertScreen(invert: boolean): void;
}

// Auto-generated. Do not edit. Really.
