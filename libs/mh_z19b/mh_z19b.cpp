#include "pxt.h"
#include "PulseIn.h"
#include <vector>

struct PulseInPinObject {
    DigitalInOutPin pin;
    codal::PulseIn *pulseIn;
};

constexpr size_t MAX_SIZE_PULSEIN_MAP = 32;

std::vector<PulseInPinObject> pulseInMap;

namespace input {

codal::PulseIn *getPulseInForPin(DigitalInOutPin pin) {
    for (int i = 0; i < pulseInMap.size(); ++i) {
        auto obj = pulseInMap[i];
        if (obj.pin == pin) {
            return obj.pulseIn;
        }
    }

    if (pulseInMap.size() >= MAX_SIZE_PULSEIN_MAP) {
        return nullptr;
    }

    codal::PulseIn *pi = new codal::PulseIn(*pin);
    pulseInMap.push_back(PulseInPinObject{.pin = pin, .pulseIn = pi});

    return pi;
}

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

    auto pi = getPulseInForPin(pin);

    if (pi == nullptr) {
        return -10;
    }

    pin->setPolarity(1);
    int pulse = pi->awaitPulse(2000000) / 1000;

    if (pulse < 0) {
        return -20;
    }
    return 5000 * (pulse - 2) / 1000;
}

} // namespace input