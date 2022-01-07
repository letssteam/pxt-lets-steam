#include "pxt.h"
#include "target_barometer.h"

enum class PressureCondition {
    //% block="high"
    High = SENSOR_THRESHOLD_HIGH,
    //% block="low"
    Low = SENSOR_THRESHOLD_LOW
};

enum class PressureUnit {
    //% block="hPa"
    HectoPascal,
    //% block="mBar"
    mBar
};

namespace pxt {
SINGLETON(WBarometer);
}

namespace input {

/**
 * Run some code when the pressure changes from high to low, or from low to high.
 * @param condition the condition, low or high, the event triggers on
 * @param pressure the pressure at which this event happens, eg: 1013.25
 * @param unit the unit of the pressure
 */
//% blockId=input_on_pressure_condition_changed block="on pressure %condition|at %pressure |%unit"
//% help=input/on-pressure-condition-changed blockExternalInputs=0
//% parts="pressure"
//% group="Pressure"
//% weight=76
void onPressureConditionChanged(PressureCondition condition, int pressure, PressureUnit unit, Action handler) {
    auto sensor = getWBarometer()->sensor;
    sensor->updateSample();

    float t = pressure;

    if (condition == PressureCondition::Low)
        sensor->setLowThreshold(t);
    else
        sensor->setHighThreshold(t);
    registerWithDal(sensor->id, (int)condition, handler);
}

/**
 * Get the pressure.
 */
//% help=input/pressure
//% blockId=device_pressure block="pressure in %unit"
//% parts="pressure"
//% group="Pressure"
//% weight=26
int pressure(PressureUnit unit) {
    return (int)getWBarometer()->sensor->getValue();
}
} // namespace input