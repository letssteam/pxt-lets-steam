#include "pxt.h"

constexpr uint8_t EC_SAMPLE = 30;
constexpr float EC_VREF = 3.3f;
constexpr float EC_TO_VOLT = EC_VREF / 1024.0f;
constexpr float EC_K_FACTOR = 39.78885f;

enum class ECUnit {
    //% block="S/cm"
    S_CM,
    //% block="mS/cm"
    MS_CM,
    //% block="µS/cm"
    US_CM
};

namespace input {

/**
 * @brief Get the EC
 *
 * @param pin the pin where the sensor is connected
 * @return int
 */
//% blockId=input_get_ec_value block="read ElectroConductivity on %pin in %unit"
//% help=input/input_get_ec_value
//% parts="ecmeter_sen0244"
//% group="Electroconductivity" weight="90"
//% pin.fieldEditor="gridpicker"
//% pin.fieldOptions.width=220
//% pin.fieldOptions.columns=4
//% trackArgs=0
float getECValue(AnalogInPin pin, ECUnit unit) {
    float voltage = 0.0f;

    for (uint8_t i = 0; i < EC_SAMPLE; ++i) {
        voltage += pin->getAnalogValue();
    }

    voltage /= (float)EC_SAMPLE;
    voltage *= EC_TO_VOLT;

    float resistance = (5600.0 / voltage) * 0.204;
    float conductivity = (1.0f / resistance) * EC_K_FACTOR;

    switch (unit) {
    case ECUnit::US_CM:
        return conductivity * 1000000.0f;

    case ECUnit::MS_CM:
        return conductivity * 1000.0f;

    case ECUnit::S_CM:
    default:
        return conductivity;
    }
}

} // namespace input