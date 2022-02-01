#include "pxt.h"
#include "ssd1306.h"

namespace pxt {
class WSSD1306 {
  private:
    CODAL_I2C *i2c;

  public:
    codal::SSD1306_I2C screen;
    bool isInitialized;

    static constexpr uint16_t I2C_ADDRESS = 0x78;
    static constexpr uint16_t WIDTH = 128;
    static constexpr uint16_t HEIGHT = 64;

    WSSD1306()
        : i2c(pxt::getI2C(LOOKUP_PIN(SDA), LOOKUP_PIN(SCL))), isInitialized(false)
    /*screen(i2c, I2C_ADDRESS, WIDTH, HEIGHT, false)*/ {
        // screen.init();
    }
};
} // namespace pxt
