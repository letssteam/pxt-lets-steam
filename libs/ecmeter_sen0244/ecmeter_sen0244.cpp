#include "pxt.h"

constexpr uint8_t EC_SAMPLE = 30;
constexpr float EC_VREF = 3.3;

namespace input {

/**
 * @brief Get the CO2 concentration
 *
 * @param pin the pin where the sensor is connected
 * @return int
 */
//% blockId=input_get_ec_value block="read ElectroConductivity in %unit on %pin"
//% help=input/input_get_ec_value
//% parts="ecmeter_sen0244"
//% group="Electroconductivity" weight="90"
//% pin.fieldEditor="gridpicker"
//% pin.fieldOptions.width=220
//% pin.fieldOptions.columns=4
//% trackArgs=0
int getECValue(ECUnit unit, DigitalInOutPin pin) {
    float value = 0f;

    for (uint8_t i = 0; i < EC_SAMPLE; ++i) {
        value += pin->getAnalogValue();
    }

    value /= (float)EC_SAMPLE;
    value *= EC_VREF / 1024.0;

    float ppm = (133.42 * value * vaue * value - 255.86 * value * value + 857.39 * value) * 0.5;
    return ppm;
}

} // namespace input