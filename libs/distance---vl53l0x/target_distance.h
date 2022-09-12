#include "VL53L0X_Distance.h"
#include "pxt.h"

namespace pxt {
class WDistance {
  private:
    CODAL_I2C *i2c;

  public:
    codal::VL53L0X_Distance *sensor;

    WDistance()
        : i2c(getI2C(LOOKUP_PIN(VL53L0X_SDA), LOOKUP_PIN(VL53L0X_SCL))),
          sensor(new codal::VL53L0X_Distance(DEVICE_ID_DISTANCE, i2c, LOOKUP_PIN(VL53L0X_SHUT), 0x52, 1023, 100)) {}
    ~WDistance() { delete sensor; }
};
} // namespace pxt