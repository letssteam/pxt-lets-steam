#include "pxt.h"
#include <vector>

constexpr float adc_precision = 3.3 / 1024.0;

std::vector<std::pair<int, float>> offset_tab;

namespace input {

/**
 * @brief Get the PH
 *
 * @param pin the pin where the sensor is connected
 * @return int
 */
//% blockId=input_get_PH block="read pH from %pin"
//% help=input/input_get_PH
//% parts="phmeter"
//% group="pH" weight="90"
//% pin.fieldEditor="gridpicker"
//% pin.fieldOptions.width=220
//% pin.fieldOptions.columns=4
//% trackArgs=0
int getPhmeterPh(AnalogInPin pin) {
    float offset = 0.0;
    for (const auto &entry : offset_tab) { // search an existing offset
        if (entry.first == pin->id) {
            offset = entry.second;
            break;
        }
    }
    return 3.5 * (pin->getAnalogValue() * adc_precision) + offset; // all math come from the pH-meter doc
}

/**
 * Calibrate the pH-meter
 * @param pin the pin where the sensor is connected
 * @param offset the value to calibrate the pH-meter
 */
//% help=output/output_calibrate_pHmeter
//% blockId=output_calibrate_pHmeter block="Calibrate the pH-meter at %pin to %offset"
//% parts="phmeter"
//% group="pH" weight=5
//% pin.fieldEditor="gridpicker"
//% pin.fieldOptions.width=220
//% pin.fieldOptions.columns=4

void calibratePhmeter(AnalogInPin pin, float offset_value) {
    for (auto &entry : offset_tab) { // search an existing offset
        if (entry.first == pin->id) {
            entry.second = offset_value;
            return;
        }
    }
    offset_tab.push_back(std::make_pair(pin->id, offset_value));
}

} // namespace input