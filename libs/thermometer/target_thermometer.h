#include "HTS221_Temperature.h"
#include "pxt.h"

namespace pxt {
class WTemp {
  private:
    CODAL_I2C *i2c;

  public:
    codal::Sensor *sensor;

    WTemp() {}
};
} // namespace pxt
