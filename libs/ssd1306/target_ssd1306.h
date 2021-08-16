#include "STM32DISCO_L475VG_IOT.h"
#include "pxt.h"
#include "ssd1306.h"

namespace pxt {
class WSSD1306 {
  public:
    codal::SSD1306_I2C screen;
    STM32DISCO_L475VG_IOT iotNode;

    static constexpr uint16_t I2C_ADDRESS = 0x78;
    static constexpr uint16_t WIDTH = 128;
    static constexpr uint16_t HEIGHT = 64;

    WSSD1306() : screen(iotNode.i2c1, I2C_ADDRESS, WIDTH, HEIGHT) { screen.init(); }
};
} // namespace pxt
