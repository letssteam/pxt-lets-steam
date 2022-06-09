#include "pxt.h"
#include "target_lcd_i2c.h"

namespace pxt {
SINGLETON(WLCDI2C);
}

namespace lcd_i2c {
uint8_t strAddressToNumber(String addr) {
    uint8_t result = 0;

    for (uint8_t i = 0; i < 2 && i < addr->getLength(); i++) {
        char c = *(addr->getUTF8DataAt(i));

        if (c >= '0' && c <= '9') {
            result += c - '0';
        } else if (c >= 'A' && c <= 'F') {
            result += 10 + (c - 'A');
        } else if (c >= 'a' && c <= 'f') {
            result += 10 + (c - 'a');
        } else {
            return 0;
        }
    }

    return result;
}

/**
 * @brief Initialise the 16x2 screen with address 0x4E
 */
//% blockId="I2C_LCD_INIT"
//% block="init i2c LCD"
//% weight=100
//% blockGap=8
//% parts=lcd_i2c
void initScreen() {
    if (getWLCDI2C()->lcd != nullptr) {
        delete getWLCDI2C()->lcd;
    }

    getWLCDI2C()->lcd = new codal::I2C_LCD(getWLCDI2C()->i2c, 0x4E, 16, 2);
    getWLCDI2C()->lcd->init();
    getWLCDI2C()->lcd->backlightOn();
}

/**
 * @brief Initialise the 16x2 screen with specific address
 *
 * @param address the hexadecimal address of the screen, eg: "4E"
 */
//% blockId="I2C_LCD_INIT_ADDRESS"
//% block="init i2c LCD 0x%address"
//% weight=99
//% blockGap=8
//% parts=lcd_i2c trackArgs=0
void initScreenAddress(String address) {
    if (getWLCDI2C()->lcd != nullptr) {
        delete getWLCDI2C()->lcd;
    }

    getWLCDI2C()->lcd = new codal::I2C_LCD(getWLCDI2C()->i2c, strAddressToNumber(address), 16, 2);
    getWLCDI2C()->lcd->init();
    getWLCDI2C()->lcd->backlightOn();
}

/**
 * Set cursor position at given position
 * @param x is lcd column position, eg: 0
 * @param y is lcd row position, eg: 0
 */
//% blockId="I2C_LCD_SET_CURSOR"
//% block="set cursor position |at x %x|y %y"
//% weight=89
//% blockGap=8
//% x.min=0 x.max=15
//% y.min=0 y.max=1
//% parts=lcd_i2c trackArgs=0
void setCursor(uint8_t x, uint8_t y) {
    if (getWLCDI2C()->lcd == nullptr)
        return;

    getWLCDI2C()->lcd->setCursor(x, y);
}

/**
 * Show a number in lcd at given position
 * @param n is number will be show, eg: 10, 100, 200
 */
//% blockId="I2C_LCD_SHOW_NUMBER"
//% block="show number %n"
//% weight=90
//% blockGap=8
//% parts=lcd_i2c trackArgs=0
void ShowNumber(int n) {
    if (getWLCDI2C()->lcd == nullptr)
        return;

    getWLCDI2C()->lcd->print(n);
}

/**
 * Show a string in lcd at given position
 * @param s is string will be show, eg: "Hello"
 */
//% blockId="I2C_LCD_SHOW_STRING"
//% block="show string %s"
//% weight=90
//% blockGap=8
//% parts=lcd_i2c trackArgs=0
void ShowString(String s) {
    if (getWLCDI2C()->lcd == nullptr)
        return;

    getWLCDI2C()->lcd->print(s->getUTF8Data());
}

/**
 * Show a name:value pair in lcd at given position
 * @param name : a string that is the name part of the name:value pair, eg: "x"
 * @param value : a number that is the value part of the name:value pair, eg: 0
 */
//% blockId="I2C_LCD_SHOW_VALUE"
//% block="show value %name = %value"
//% weight=90
//% blockGap=8
//% parts=lcd_i2c trackArgs=0
void ShowValue(String name, int value) {
    if (getWLCDI2C()->lcd == nullptr)
        return;

    getWLCDI2C()->lcd->print(name->getUTF8Data());
    getWLCDI2C()->lcd->print(':');
    getWLCDI2C()->lcd->print(value);
}

/**
 * Clear all display content
 */
//% blockId="I2C_LCD_CLEAR"
//% block="clear screen"
//% weight=85
//% blockGap=8
//% parts=lcd_i2c trackArgs=0
void clear() {
    if (getWLCDI2C()->lcd == nullptr)
        return;

    getWLCDI2C()->lcd->clear();
}

/**
 * Turn on lcd backlight
 */
//% blockId="I2C_LCD_BACKLIGHT_ON"
//% block="turn on backlight"
//% group="Backlight"
//% weight=71
//% blockGap=8
//% parts=lcd_i2c trackArgs=0
void BacklightOn() {
    if (getWLCDI2C()->lcd == nullptr)
        return;

    getWLCDI2C()->lcd->backlightOn();
}

/**
 * Turn off lcd backlight
 */
//% blockId="I2C_LCD_BACKLIGHT_OFF"
//% block="turn off backlight"
//% group="Backlight"
//% weight=70
//% blockGap=8
//% parts=lcd_i2c trackArgs=0
void BacklightOff() {
    if (getWLCDI2C()->lcd == nullptr)
        return;

    getWLCDI2C()->lcd->backlightOff();
}

/**
 * Show a number in lcd at given position
 * @param n is number will be show, eg: 10, 100, 200
 * @param x is lcd column position, eg: 0
 * @param y is lcd row position, eg: 0
 */
//% blockId="I2C_LCD_SHOW_NUMBER_AT_POS"
//% block="show number %n|at x %x|y %y"
//% group="More"
//% weight=10
//% blockGap=8
//% x.min=0 x.max=15
//% y.min=0 y.max=1
//% parts=lcd_i2c trackArgs=0
void ShowNumberAtPos(int n, uint8_t x, uint8_t y) {
    if (getWLCDI2C()->lcd == nullptr)
        return;

    getWLCDI2C()->lcd->setCursor(x, y);
    ShowNumber(n);
}

/**
 * Show a string in lcd at given position
 * @param s is string will be show, eg: "Hello"
 * @param x is lcd column position, [0 - 15], eg: 0
 * @param y is lcd row position, [0 - 1], eg: 0
 */
//% blockId="I2C_LCD_SHOW_STRING_AT_POS"
//% block="show string %s|at x %x|y %y"
//% group="More"
//% weight=10
//% blockGap=8
//% x.min=0 x.max=15
//% y.min=0 y.max=1
//% parts=lcd_i2c trackArgs=0
void ShowStringAtPos(String s, uint8_t x, uint8_t y) {
    if (getWLCDI2C()->lcd == nullptr)
        return;

    getWLCDI2C()->lcd->setCursor(x, y);
    ShowString(s);
}
} // namespace lcd_i2c