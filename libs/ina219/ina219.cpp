#include "pxt.h"
#include "target_ina219.h"

namespace pxt {
SINGLETON(WINA219);
}

namespace input {

void init() {
    static bool is_configured = false;

    if (!is_configured) {
        auto ina = getWINA219();
        ina->init();

        is_configured = true;
    }
}

/**
 * @brief Get the Voltage measurement, the INA219 module must be placed *before* to perform accurate voltage measurements
 *
 * @return float
 */
//% blockId=input_get_ina219_voltage block="read voltage in V"
//% help=input/input_get_ina219_voltage
//% parts="ina219"
//% group="Current & Voltage" weight="90"
float getINA219Voltage() {
    init();

    auto ina = getWINA219();
    return ina->getBusVoltage() + (ina->getShuntVoltage() / 1000.0);
}

/**
 * @brief Get the Current measurement
 *
 * @return float
 */
//% blockId=input_get_ina219_current block="read current in mA"
//% help=input/input_get_ina219_current
//% parts="ina219"
//% group="Current & Voltage" weight="90"
float getINA219Current() {
    init();

    auto ina = getWINA219();
    return ina->getCurrent();
}

/**
 * @brief Get the Power measurement
 *
 * @return float
 */
//% blockId=input_get_ina219_power block="read power in mW"
//% help=input/input_get_ina219_power
//% parts="ina219"
//% group="Current & Voltage" weight="90"
float getINA219Power() {
    init();

    auto ina = getWINA219();
    return ina->getPower();
}

} // namespace input