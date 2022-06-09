// Auto-generated. Do not edit.
declare namespace lcd_i2c {

    /**
     * @brief Initialise the 16x2 screen with address 0x4E
     */
    //% blockId="I2C_LCD_INIT"
    //% block="init i2c LCD"
    //% weight=100
    //% blockGap=8
    //% parts=lcd_i2c shim=lcd_i2c::initScreen
    function initScreen(): void;

    /**
     * @brief Initialise the 16x2 screen with specific address
     *
     * @param address the hexadecimal address of the screen, eg: "4E"
     */
    //% blockId="I2C_LCD_INIT_ADDRESS"
    //% block="init i2c LCD 0x%address"
    //% weight=99
    //% blockGap=8
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::initScreenAddress
    function initScreenAddress(address: string): void;

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
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::setCursor
    function setCursor(x: uint8, y: uint8): void;

    /**
     * Show a number in lcd at given position
     * @param n is number will be show, eg: 10, 100, 200
     */
    //% blockId="I2C_LCD_SHOW_NUMBER"
    //% block="show number %n"
    //% weight=90
    //% blockGap=8
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::ShowNumber
    function ShowNumber(n: int32): void;

    /**
     * Show a string in lcd at given position
     * @param s is string will be show, eg: "Hello"
     */
    //% blockId="I2C_LCD_SHOW_STRING"
    //% block="show string %s"
    //% weight=90
    //% blockGap=8
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::ShowString
    function ShowString(s: string): void;

    /**
     * Show a name:value pair in lcd at given position
     * @param name : a string that is the name part of the name:value pair, eg: "x"
     * @param value : a number that is the value part of the name:value pair, eg: 0
     */
    //% blockId="I2C_LCD_SHOW_VALUE"
    //% block="show value %name = %value"
    //% weight=90
    //% blockGap=8
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::ShowValue
    function ShowValue(name: string, value: int32): void;

    /**
     * Clear all display content
     */
    //% blockId="I2C_LCD_CLEAR"
    //% block="clear screen"
    //% weight=85
    //% blockGap=8
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::clear
    function clear(): void;

    /**
     * Turn on lcd backlight
     */
    //% blockId="I2C_LCD_BACKLIGHT_ON"
    //% block="turn on backlight"
    //% group="Backlight"
    //% weight=71
    //% blockGap=8
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::BacklightOn
    function BacklightOn(): void;

    /**
     * Turn off lcd backlight
     */
    //% blockId="I2C_LCD_BACKLIGHT_OFF"
    //% block="turn off backlight"
    //% group="Backlight"
    //% weight=70
    //% blockGap=8
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::BacklightOff
    function BacklightOff(): void;

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
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::ShowNumberAtPos
    function ShowNumberAtPos(n: int32, x: uint8, y: uint8): void;

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
    //% parts=lcd_i2c trackArgs=0 shim=lcd_i2c::ShowStringAtPos
    function ShowStringAtPos(s: string, x: uint8, y: uint8): void;
}

// Auto-generated. Do not edit. Really.
