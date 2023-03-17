#include "pxt.h"
#include "PulseIn.h"
#include <vector>

constexpr int TIMEOUT_PULSE = 2500;

namespace input {

/**
 * @brief Get the CO2 concentration
 *
 * @param pin the pin where the sensor is connected
 * @return int
 */
//% blockId=input_get_co2_concentration block="read CO2 concentration %pin"
//% help=input/input_get_co2_concentration
//% parts="mh_z19b"
//% group="CO2" weight="90"
//% pin.fieldEditor="gridpicker"
//% pin.fieldOptions.width=220
//% pin.fieldOptions.columns=4
//% trackArgs=0
int getCO2Concentration(DigitalInOutPin pin) {
    int start = current_time_ms();

    while (pin->getDigitalValue() == 1) {
        if ((current_time_ms() - start) >= TIMEOUT_PULSE) {
            return -10;
        }
    }

    while (pin->getDigitalValue() == 0) {
        if ((current_time_ms() - start) >= TIMEOUT_PULSE) {
            return -20;
        }
    }

    int begin = current_time_ms();

    while (pin->getDigitalValue() == 1) {
        if ((current_time_ms() - begin) >= TIMEOUT_PULSE) {
            return -30;
        }
    }

    int pulse = current_time_ms() - begin;

    return 5000 * (pulse - 2) / 1000;
}

} // namespace input