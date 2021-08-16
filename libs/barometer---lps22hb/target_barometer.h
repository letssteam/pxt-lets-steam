#include "LPS22HB_Pressure.h"
#include "STM32DISCO_L475VG_IOT.h"
#include "Sensor.h"
#include "pxt.h"

namespace pxt {
class WBarometer {
  public:
    codal::Sensor *sensor;

    WBarometer() {
        if (codal::default_device_instance == nullptr) {
            codal::default_device_instance = new codal::STM32DISCO_L475VG_IOT();
        }

        sensor = new codal::LPS22HB_Pressure(DEVICE_ID_PRESSURE,
                                             codal::default_device_instance->i2c2, 0xBA);
    }
    ~WBarometer() { delete sensor; }
};
} // namespace pxt