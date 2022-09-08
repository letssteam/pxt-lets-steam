#include "LPS22HB_Temperature.h"
#include "pxt.h"

namespace pxt {
class WTemp {
  private:
    CODAL_I2C *i2c;

  public:
    codal::LPS22HB_Temperature *sensor;

    WTemp()
        : i2c(getI2C(LOOKUP_PIN(HTS221_SDA), LOOKUP_PIN(HTS221_SCL))),
          sensor(new codal::LPS22HB_Temperature(DEVICE_ID_THERMOMETER, i2c, 0xBA, 1023)) {}
    ~WTemp() { delete sensor; }
};
} // namespace pxt
