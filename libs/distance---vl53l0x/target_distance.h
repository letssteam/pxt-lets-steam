#include "STM32DISCO_L475VG_IOT.h"
#include "VL53L0X_Distance.h"
#include "pxt.h"

namespace pxt {
class WDistance {
  public:
    codal::Sensor *sensor;

    WDistance() {
        if (codal::default_device_instance == nullptr) {
            codal::default_device_instance = new codal::STM32DISCO_L475VG_IOT();
        }

        sensor =
            new codal::VL53L0X_Distance(DEVICE_ID_DISTANCE, codal::default_device_instance->i2c2,
                                        codal::default_device_instance->io.pc6, 0x52);
    }
    ~WDistance() { delete sensor; }
};
} // namespace pxt