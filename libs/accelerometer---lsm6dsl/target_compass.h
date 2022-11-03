#include "LIS3MDL_Magnetometer.h"
#include "Pin.h"
#include "axis.h"
#include "pxt.h"

namespace pxt {

// Wrapper classes
class WCompas {
  private:
    CODAL_I2C *i2c;
    codal::CoordinateSpace coordinateSpace;

  public:
    codal::Compass *magnetometer;

    WCompas()
        : i2c(getI2C(LOOKUP_PIN(LSM6DSL_SDA), LOOKUP_PIN(LSM6DSL_SCL))),
          coordinateSpace(codal::CoordinateSystem::SIMPLE_CARTESIAN),
          magnetometer(new codal::LIS3MDL_Magnetometer(i2c, 0x3C, coordinateSpace)) {
        magnetometer->configure();
    }

    ~WCompas() { delete magnetometer; }
};
} // namespace pxt