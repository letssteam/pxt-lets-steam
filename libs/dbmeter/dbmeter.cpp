#include "pxt.h"
#include "target_dbmeter.h"

enum class DBMeterCondition {
    //% block="Higher"
    HIGHER = SENSOR_THRESHOLD_HIGH,
    //% block="Lower"
    LOWER = SENSOR_THRESHOLD_LOW
};

namespace pxt {
SINGLETON(WDBMeter);
}

namespace input {

/**
 * Run some code when the distance changes from near to far, or from far to near.
 * @param condition the condition, higher or lower, the event triggers on
 * @param value the value at which this event happens, eg: 80
 */
//% blockId=input_on_dbmeter_condition_changed block="on decibel %condition|at %distance"
//% parts="dbmeter"
//% help=input/input_on_dbmeter_condition_changed blockExternalInputs=0
//% group="dB Meter" weight=76
void ondbMeterConditionChanged(DBMeterCondition condition, int value, Action handler) {
    auto sensor = getWDBMeter()->sensor;
    sensor->updateSample();

    if (condition == DBMeterCondition::LOWER)
        sensor->setLowThreshold(value);
    else
        sensor->setHighThreshold(value);

    registerWithDal(sensor->id, (int)condition, handler);
}

/**
 * @brief Get the decibel value
 */
//% help=input/decibel
//% blockId=device_decibel block="get decibel"
//% parts="dbmeter"
//% group="dB Meter"
//% weight=26
int decibel() {
    return getWDBMeter()->sensor->getValue();
}

} // namespace input