#include "pxt.h"

enum class AnemometerUnit {
    //% block="RPM"
    RPM = 0,
    //% block="RPS"
    RPS = 1
};

namespace input {

/**
 * @brief Get the anemometer cup rotation frequency
 *
 * @param pin the pin where the anemometer is connected
 * @param timeSpan the time length of the measurement in seconds
 * @param unit the measurement unit
 * @return int
 */
//% blockId=input_anemometer_get_rotation_per_unit block="get anemometer rotation on %pin in %unit for %timeSpan seconds "
//% help=input/anemometer_get_rotation_per_unit
//% parts=anemometer
//% group="Anemometer" weight="90"
//% pin.fieldEditor="gridpicker"
//% pin.fieldOptions.width=220
//% pin.fieldOptions.columns=4
//% timeSpan.min=1 timeSpan.max=10 timeSpan.defl=1
//% trackArgs=0
//% promise
int getAnemometerRotationPerUnit(DigitalInOutPin pin, AnemometerUnit unit, int timeSpan) {
    switch (unit) {
    case AnemometerUnit::RPS:
        return getAnemometerRotation(pin, timeSpan) / timeSpan;
    case AnemometerUnit::RPM:
        return getAnemometerRotation(pin, timeSpan) / timeSpan * 60;
    }
}

/**
 * @brief Get the anemometer cup rotation frequency
 *
 * @param pin the pin where the anemometer is connected
 * @param timeSpan the time length of the measurement in seconds
 * @return int
 */
//% blockId=input_anemometer_get_rotation block="get anemometer number of rotations on %pin for %timeSpan seconds"
//% help=input/anemometer_get_rotation
//% parts=anemometer
//% group="Anemometer" weight="90"
//% pin.fieldEditor="gridpicker"
//% pin.fieldOptions.width=220
//% pin.fieldOptions.columns=4
//% timeSpan.min=1 timeSpan.max=10 timeSpan.defl=1
//% trackArgs=0
//% promise
int getAnemometerRotation(DigitalInOutPin pin, int timeSpan) {
    int endMeasureTime = current_time_ms() + (timeSpan * 1000);
    int rotations = 0;
    bool isAlreadyCounted = false;

    while (current_time_ms() < endMeasureTime) {
        if (pin.getDigitalValue() == 1 && !isAlreadyCounted) {
            ++rotations;
            isAlreadyCounted = true;
        }
        if (pin.getDigitalValue() == 0 && isAlreadyCounted) {
            isAlreadyCounted = false;
        }
    }

    return rotations;
}

} // namespace input