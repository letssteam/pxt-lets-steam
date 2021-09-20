#include "LSM6DSL_Accelerometer.h"
#include "Pin.h"
#include "axis.h"
#include "pxt.h"

namespace pxt {

// Wrapper classes
class WAccel {
  private:
    CODAL_I2C *i2c;
    codal::CoordinateSpace coordinateSpace;

  public:
    codal::Accelerometer *acc = nullptr;

    WAccel()
        : i2c(getI2C(LOOKUP_PIN(LSM6DSL_SDA), LOOKUP_PIN(LSM6DSL_SCL))),
          coordinateSpace(SIMPLE_CARTESIAN, true, COORDINATE_SPACE_ROTATED_180),
          acc(new codal::LSM6DSL_Accelerometer(i2c, 0xD4, coordinateSpace)) {}

    ~WAccel() { delete acc; }
};
} // namespace pxt