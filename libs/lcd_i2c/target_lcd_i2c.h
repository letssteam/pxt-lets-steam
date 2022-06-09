#include "pxt.h"
#include "STM32I2C.h"
#include "i2c_lcd.h"

namespace pxt {
class WLCDI2C {
  public:
    codal::STM32I2C i2c;
    codal::I2C_LCD *lcd;
    WLCDI2C() : i2c(*LOOKUP_PIN(SDA), *LOOKUP_PIN(SCL)), lcd(nullptr) {}
};
} // namespace pxt