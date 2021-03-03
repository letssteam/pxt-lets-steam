#include "pxt.h"
// #include "rgb_lcd.h"


namespace pxt {
  class WLCD {
    public:
    //   codal::STM32L4xxI2C i2c;
    //   codal::rgb_lcd lcd;
      WLCD()/*: i2c(*LOOKUP_PIN(SDA), *LOOKUP_PIN(SCL)),
      lcd(i2c, 16, 2)*/
      {
        // i2c.init();
        // lcd.init();
      }
  };
}