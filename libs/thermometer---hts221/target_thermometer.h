#include "HTS221_Temperature.h"
#include "STM32DISCO_L475VG_IOT.h"
#include "pxt.h"

namespace pxt {
class WTemp {
  public:
    codal::Sensor *sensor;

    WTemp() {
        if (codal::default_device_instance == nullptr) {
            codal::default_device_instance = new codal::STM32DISCO_L475VG_IOT();
        }

        sensor = new codal::HTS221_Temperature(DEVICE_ID_THERMOMETER,
                                               codal::default_device_instance->i2c2, 0xBE);
    }
    ~WTemp() { delete sensor; }
};
} // namespace pxt
