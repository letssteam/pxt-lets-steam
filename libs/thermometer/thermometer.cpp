#include "pxt.h"
#include "target_thermometer.h"

enum class TemperatureCondition {
    //% block="hot"
    Hot = SENSOR_THRESHOLD_HIGH,
    //% block="cold"
    Cold = SENSOR_THRESHOLD_LOW
};

enum class TemperatureUnit {
    //% block="°C"
    Celsius,
    //% block="°F"
    Fahrenheit
};

namespace pxt {
SINGLETON(WTemp);
}

namespace input {

/**
 * Run some code when the temperature changes from hot to cold, or from cold to hot.
 * @param condition the condition, hot or cold, the event triggers on
 * @param temperature the temperature at which this event happens, eg: 15
 * @param unit the unit of the temperature
 */
//% blockId=input_on_temperature_condition_changed block="on temperature %condition|at %temperature|%unit"
//% parts="thermometer"
//% help=input/on-temperature-condition-changed blockExternalInputs=0 
//% group="More" weight=76
void onTemperatureConditionChanged(TemperatureCondition condition, int temperature, TemperatureUnit unit, Action handler) {
    auto thermo = getWTemp();
    if (!thermo)
        return;

    auto sensor = thermo->sensor;
    sensor->updateSample();

    int t = unit == TemperatureUnit::Celsius ? temperature : ((temperature - 32) * 10) / 18;

    if (condition == TemperatureCondition::Cold)
        sensor->setLowThreshold(t);
    else
        sensor->setHighThreshold(t);
    registerWithDal(sensor->id, (int)condition, handler);
}

/**
 * Get the temperature in Celsius or Fahrenheit degrees.
 */
//% help=input/temperature
//% blockId=device_temperature block="temperature in %unit"
//% parts="thermometer"
//% weight=26
int temperature(TemperatureUnit unit) {
    auto thermo = getWTemp();

    // default to -1000 if not present
    int value = (NULL != thermo) ? (int)thermo->sensor->getValue() : -1000;

    if (unit == TemperatureUnit::Celsius)
        return value;
    else
        return (value * 18) / 10 + 32;
}
} // namespace input
