#include "LSM6DSL_Gyroscope.h"
#include "Pin.h"
#include "axis.h"
#include "pxt.h"

namespace pxt {

// Wrapper classes
class WGyro {
  private:
    CODAL_I2C *i2c;
    codal::CoordinateSpace coordinateSpace;

  public:
    codal::Gyroscope *gyroscope = nullptr;

    WGyro()
        : i2c(getI2C(LOOKUP_PIN(LSM6DSL_SDA), LOOKUP_PIN(LSM6DSL_SCL))),
          coordinateSpace(SIMPLE_CARTESIAN, true, COORDINATE_SPACE_ROTATED_180),
          gyroscope(new codal::LSM6DSL_Gyroscope(i2c, 0xD4, coordinateSpace)) {}

    ~WGyro() { delete gyroscope; }
};
} // namespace pxt