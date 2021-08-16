#include "LIS3MDL_Magnetometer.h"
#include "Pin.h"
#include "STM32DISCO_L475VG_IOT.h"
#include "axis.h"
#include "pxt.h"

namespace pxt {

// Wrapper classes
class WCompas {
  public:
    codal::Compass *magnetometer;

    WCompas() : coordinateSpace(SIMPLE_CARTESIAN, true, COORDINATE_SPACE_ROTATED_180) {
        if (codal::default_device_instance == nullptr) {
            codal::default_device_instance = new codal::STM32DISCO_L475VG_IOT();
        }

        magnetometer = new codal::LIS3MDL_Magnetometer(codal::default_device_instance->i2c2, 0x3C,
                                                       coordinateSpace);
    }

    ~WCompas() { delete magnetometer; }

  private:
    codal::CoordinateSpace coordinateSpace;
};
} // namespace pxt