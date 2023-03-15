#include "pxt.h"

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
    return -101; // pin->getAnalogValue();
}

} // namespace input