#include "pxt.h"

namespace input {

/**
 * @brief Get the Soil Humidity data
 *
 * @param pin the pin where the sensor is connected
 * @return int
 */
//% blockId=input_get_soil_humidity block="read soil humidity from %pin"
//% help=input/input_get_soil_humidity
//% parts="soil_hygrometer"
//% group="Soil Hygrometer" weight="90"
//% pin.fieldEditor="gridpicker"
//% pin.fieldOptions.width=220
//% pin.fieldOptions.columns=4
//% trackArgs=0
int getSoilHumidity(AnalogInPin pin) {
    return pin->getAnalogValue();
}

} // namespace input