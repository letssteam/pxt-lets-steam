#include "LSM6DSL_Gyroscope.h"
#include "Pin.h"
#include "STM32DISCO_L475VG_IOT.h"
#include "axis.h"
#include "pxt.h"

namespace pxt {

// Wrapper classes
class WGyro {
  public:
    codal::Gyroscope *gyroscope = nullptr;

    WGyro() : coordinateSpace(SIMPLE_CARTESIAN, true, COORDINATE_SPACE_ROTATED_180) {
        if (codal::default_device_instance == nullptr) {
            codal::default_device_instance = new codal::STM32DISCO_L475VG_IOT();
        }

        gyroscope = new codal::LSM6DSL_Gyroscope(codal::default_device_instance->i2c2, 0xD4,
                                                 coordinateSpace);
    }

    ~WGyro() { delete gyroscope; }

  private:
    codal::CoordinateSpace coordinateSpace;
};
} // namespace pxt