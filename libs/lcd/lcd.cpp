#include "pxt.h"
// #include "target_lcd.h"

namespace pxt {
// SINGLETON(WLCD);
}

namespace lcd {
    uint8_t unpackR(uint32_t rgb) {
        uint8_t r = (rgb >> 16) & 0xFF;
        return r;
    }
    uint8_t unpackG(uint32_t rgb) {
        uint8_t g = (rgb >> 8) & 0xFF;
        return g;
    }
    uint8_t unpackB(uint32_t rgb) {
        uint8_t b = (rgb >> 0) & 0xFF;
        return b;
    }


    /**
     * Set cursor position at given position
     * @param x is LCD column position, eg: 0
     * @param y is LCD row position, eg: 0
     */
    //% blockId="LCD_SET_CURSOR" 
    //% block="set cursor position |at x %x|y %y"
    //% weight=89 
    //% blockGap=8 
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% parts=lcd trackArgs=0
    void setCursor(uint8_t x ,uint8_t y){
        // getWLCD()->lcd.setCursor(x, y);
    }

    /**
     * Show a number in LCD at given position
     * @param n is number will be show, eg: 10, 100, 200
     */
    //% blockId="LCD_SHOW_NUMBER" 
    //% block="show number %n"
    //% weight=90 
    //% blockGap=8
    //% parts=lcd trackArgs=0
    void ShowNumber(int n){
        // getWLCD()->lcd.print(n);
    }

    /**
     * Show a string in LCD at given position
     * @param s is string will be show, eg: "Hello"
     */
    //% blockId="LCD_SHOW_STRING" 
    //% block="show string %s"
    //% weight=90 
    //% blockGap=8
    //% parts=lcd trackArgs=0
    void ShowString(String s) {
        // getWLCD()->lcd.print(s->getUTF8Data());
    }

    /**
     * Show a name:value pair in LCD at given position
     * @param name : a string that is the name part of the name:value pair, eg: "x"
     * @param value : a number that is the value part of the name:value pair, eg: 0
     */
    //% blockId="LCD_SHOW_VALUE" 
    //% block="show value %name = %value"
    //% weight=90 
    //% blockGap=8
    //% parts=lcd trackArgs=0
    void ShowValue(String name, int value) {
        // getWLCD()->lcd.print(name->getUTF8Data());
        // getWLCD()->lcd.print(':');
        // getWLCD()->lcd.print(value);
    }

    /**
     * Clear all display content
     */
    //% blockId="LCD_CLEAR" 
    //% block="clear screen"
    //% weight=85 
    //% blockGap=8
    //% parts=lcd trackArgs=0
    void clear(){
        // getWLCD()->lcd.clear();
    }

    /**
     * Set LCD backlight color
     * 
     * @param rgb RGB color of the backlight LED
     */
    //% blockId="LCD_BACKLIGHT_COLOR" 
    //% block="set backlight color %rgb=colorNumberPicker"
    //% weight=69
    //% blockGap=8
    //% group="Backlight" 
    //% parts=lcd trackArgs=0
    void SetBacklightColor(uint32_t rgb){
        // uint8_t r = unpackR(rgb);
        // uint8_t g = unpackG(rgb);
        // uint8_t b = unpackB(rgb);
        // getWLCD()->lcd.setRGB(r, g, b);
    }

    /**
     * Turn on LCD backlight
     */
    //% blockId="LCD_BACKLIGHT_ON" 
    //% block="turn on backlight"
    //% group="Backlight"  
    //% weight=71 
    //% blockGap=8
    //% parts=lcd trackArgs=0
    void BacklightOn(){
        // getWLCD()->lcd.setColorWhite();
    }

    /**
     * Turn off LCD backlight
     */
    //% blockId="LCD_BACKLIGHT_OFF" 
    //% block="turn off backlight"
    //% group="Backlight" 
    //% weight=70 
    //% blockGap=8
    //% parts=lcd trackArgs=0
    void BacklightOff(){
        // getWLCD()->lcd.setColorAll();

    }

    /**
     * Show a number in LCD at given position
     * @param n is number will be show, eg: 10, 100, 200
     * @param x is LCD column position, eg: 0
     * @param y is LCD row position, eg: 0
     */
    //% blockId="LCD_SHOW_NUMBER_AT_POS" 
    //% block="show number %n|at x %x|y %y"
    //% group="More" 
    //% weight=10 
    //% blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% parts=lcd trackArgs=0
    void ShowNumberAtPos(int n ,uint8_t x ,uint8_t y){
        // getWLCD()->lcd.setCursor(x, y);
        // ShowNumber(n);
    }

    /**
     * Show a string in LCD at given position
     * @param s is string will be show, eg: "Hello"
     * @param x is LCD column position, [0 - 15], eg: 0
     * @param y is LCD row position, [0 - 1], eg: 0
     */
    //% blockId="LCD_SHOW_STRING_AT_POS" 
    //% block="show string %s|at x %x|y %y"
    //% group="More" 
    //% weight=10 
    //% blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% parts=lcd trackArgs=0
    void ShowStringAtPos(String s, uint8_t x, uint8_t y) {
        // getWLCD()->lcd.setCursor(x, y);
        // ShowString(s);
    }
}