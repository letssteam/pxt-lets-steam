#include "pxt.h"
#include "target_ssd1306.h"

enum class PixelColor {
    //% block="Black"
    Black = 0,
    //% block="White"
    White = 1
};

namespace pxt {
SINGLETON(WSSD1306);
}

namespace screen {

/**
 * @brief Print string on screen at the given position
 * 
 * @param x pixel coordinate on X axis
 * @param y pixel coordinate on Y axis
 * @param str the string to print
 * @param color the color use to print on screen
 */
//% help=screen/printString
//% blockId=print_string_ssd1306 block="print %str on screen in %color at x: %x|y: %y"
//% parts="ssd1306"
void printString( String str, PixelColor color, uint8_t x, uint8_t y ) {
    getWSSD1306()->screen.drawText(str->getUTF8Data(), x, y, color == PixelColor::Black ? 0 : 1);
}

/**
 * @brief Fill the screen with specific color
 * 
 * @param color the color use to fill the screen
 */
//% help=screen/fillScree,
//% blockId=fill_screen_ssd1306 block="fill the screen in %color"
//% parts="ssd1306"
void fillScreen(PixelColor color) {
    getWSSD1306()->screen.fill(color == PixelColor::Black ? 0 : 1);
}

/**
 * @brief Clear the entire screen
 * 
 */
//% help=screen/clearScreen
//% blockId=clear_screen_ssd1306 block="clear the screen"
//% parts="ssd1306"
void clearScreen() {
    fillScreen(PixelColor::Black);
}

/**
 * @brief set the color of a specific pixel
 * 
 * @param x the coordinate pixel on X axis
 * @param y the coordinate pixel on Y axis
 * @param color the color of the pixel
 */
//% help=screen/setPixel
//% blockId=set_pixel_ssd1306 block="set pixel at %x, %y to %color"
//% parts="ssd1306"
void setPixel(uint8_t x, uint8_t y, PixelColor color) {
    getWSSD1306()->screen.drawPixel(x, y, color == PixelColor::Black ? 0 : 1);
}

/**
 * @brief Define if the screen should be inverted
 * 
 * @param invert if True the screen is inverted, otherwise False
 */
//% help=screen/invertScreen
//% blockId=invert_screen_ssd1306 block="invert the screen : %invert"
//% parts="ssd1306"
void invertScreen(bool invert) {
    getWSSD1306()->screen.invert(invert);
}


}