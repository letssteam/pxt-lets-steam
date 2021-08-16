#include "STM32DISCO_L475VG_IOT.h"
#include "STM32SerialBLE.h"
#include "pxt.h"

namespace pxt {

class WBluetooth {

  public:
    STM32DISCO_L475VG_IOT iotNode;
    STM32SerialBLE *serialBle;

    WBluetooth() : serialBle(nullptr) {}

    ~WBluetooth() { delete serialBle; }

    void startSerial() {
        if (serialBle != nullptr) {
            return;
        }
        serialBle = new STM32SerialBLE("6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
                                       "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
                                       "6E400003-B5A3-F393-E0A9-E50E24DCCA9E");
    }
};
} // namespace pxt