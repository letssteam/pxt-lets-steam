#include "pxt.h"
#include "ssd1306.h"

namespace pxt {
class WSSD1306 {
  private:
    CODAL_I2C *i2c;

  public:
    static constexpr uint16_t I2C_ADDRESS = 0x78;
    static constexpr uint16_t WIDTH = 128;
    static constexpr uint16_t HEIGHT = 64;

    codal::SSD1306_I2C screen;

    WSSD1306() : i2c(pxt::getI2C(LOOKUP_PIN(SDA), LOOKUP_PIN(SCL))), screen(i2c, I2C_ADDRESS, WIDTH, HEIGHT, false) {
        screen.init();
    }

    void initScreen(uint16_t address, uint16_t width, uint16_t height) {
        screen = codal::SSD1306_I2C(i2c, address, width, height, false);
        screen.init();
    }
};
} // namespace pxt
