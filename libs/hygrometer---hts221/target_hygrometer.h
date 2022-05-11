#include "HTS221_Humidity.h"
#include "Sensor.h"
#include "pxt.h"

namespace pxt {
class WHygrometer {
  private:
    CODAL_I2C *i2c;

  public:
    codal::HTS221_Humidity *sensor;

    WHygrometer()
        : i2c(getI2C(LOOKUP_PIN(HTS221_SDA), LOOKUP_PIN(HTS221_SCL))),
          sensor(new codal::HTS221_Humidity(DEVICE_ID_HUMIDITY, i2c, 0xBE, 1023)) {}

    ~WHygrometer() { delete sensor; }
};
} // namespace pxt