#include "LSM6DSL_Accelerometer.h"
#include "Pin.h"
#include "STM32DISCO_L475VG_IOT.h"
#include "axis.h"
#include "pxt.h"

namespace pxt {

// Wrapper classes
class WAccel {
  public:
    codal::Accelerometer *acc = nullptr;

    WAccel() : coordinateSpace(SIMPLE_CARTESIAN, true, COORDINATE_SPACE_ROTATED_180) {
        if (codal::default_device_instance == nullptr) {
            codal::default_device_instance = new codal::STM32DISCO_L475VG_IOT();
        }

        acc = new codal::LSM6DSL_Accelerometer(codal::default_device_instance->i2c2, 0xD4,
                                               coordinateSpace);
    }

    ~WAccel() { delete acc; }

  private:
    codal::CoordinateSpace coordinateSpace;
};
} // namespace pxt