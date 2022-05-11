#include "HTS221_Temperature.h"
#include "pxt.h"

namespace pxt {
class WTemp {
  private:
    CODAL_I2C *i2c;

  public:
    codal::HTS221_Temperature *sensor;

    WTemp()
        : i2c(getI2C(LOOKUP_PIN(HTS221_SDA), LOOKUP_PIN(HTS221_SCL))),
          sensor(new codal::HTS221_Temperature(DEVICE_ID_THERMOMETER, i2c, 0xBE, 1023)) {}
    ~WTemp() { delete sensor; }
};
} // namespace pxt
