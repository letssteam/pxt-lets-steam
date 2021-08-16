#include "HTS221_Humidity.h"
#include "STM32DISCO_L475VG_IOT.h"
#include "Sensor.h"
#include "pxt.h"

namespace pxt {
class WHygrometer {
  public:
    codal::Sensor *sensor;

    WHygrometer() {
        if (codal::default_device_instance == nullptr) {
            codal::default_device_instance = new codal::STM32DISCO_L475VG_IOT();
        }

        sensor = new codal::HTS221_Humidity(DEVICE_ID_HUMIDITY,
                                            codal::default_device_instance->i2c2, 0xBE);
    }
    ~WHygrometer() { delete sensor; }
};
} // namespace pxt