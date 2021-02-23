#include "pxt.h"
#include "ssd1306.h"
#include "STM32IotNode.h"

namespace pxt {
class WSSD1306 {
  public:
    codal::SSD1306_I2C screen;
    STM32IotNode iotNode;
    
    WSSD1306() : screen(iotNode.i2c1, 0x78, 128, 64)
    {
      screen.init();
    }
};
}