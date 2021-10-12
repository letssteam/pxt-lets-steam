#include "LPS22HB_Pressure.h"
#include "pxt.h"

namespace pxt {
class WBarometer {
  private:
    CODAL_I2C *i2c;

  public:
    codal::LPS22HB_Pressure *sensor;

    WBarometer()
        : i2c(getI2C(LOOKUP_PIN(LPS22HB_SDA), LOOKUP_PIN(LPS22HB_SCL))),
          sensor(new codal::LPS22HB_Pressure(DEVICE_ID_PRESSURE, i2c, 0xBA)) {}

    ~WBarometer() { delete sensor; }
};
} // namespace pxt