#include "pxt.h"
#include "STM32I2C.h"
#include "rgb_lcd.h"

namespace pxt {
class WLCD {
  public:
    codal::STM32I2C i2c;
    codal::rgb_lcd lcd;
    WLCD() : i2c(*LOOKUP_PIN(SDA), *LOOKUP_PIN(SCL)), lcd(i2c, 16, 2) { lcd.init(); }
};
} // namespace pxt