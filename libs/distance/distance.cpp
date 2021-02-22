#include "pxt.h"
#include "target_distance.h"

enum class DistanceCondition {
    //% block="far"
    Far = SENSOR_THRESHOLD_HIGH,
    //% block="near"
    Near = SENSOR_THRESHOLD_LOW
};

enum class DistanceUnit {
    //% block="mm"
    Millimeter,
    //% block="cm"
    Centimeter,
    //% block="dm"
    Decimeter,
    //% block="m"
    Meter
};

namespace pxt {
SINGLETON(WDistance);
}

namespace input {

/**
* Run some code when the distance changes from near to far, or from far to near.
* @param condition the condition, far or near, the event triggers on
* @param distance the distance at which this event happens, eg: 15
* @param unit the unit of the distance
*/
//% blockId=input_on_distance_condition_changed block="on distance %condition|at %distance|%unit"
//% parts="distance"
//% help=input/on-distance-condition-changed blockExternalInputs=0
//% group="More" weight=76
void onDistanceConditionChanged(DistanceCondition condition, int distance, DistanceUnit unit, Action handler) {
    auto sensor = getWDistance()->sensor;
    sensor->updateSample();

    int d;
    
    switch (unit)
    {
        case DistanceUnit::Millimeter:
            d = distance;
            break;
        case DistanceUnit::Centimeter:
            d = distance * 10;
            break;
        case DistanceUnit::Decimeter:
            d = distance * 100;
            break;
        case DistanceUnit::Meter:
            d = distance * 1000;
            break;
        default:
            d = 0;
            break;
    }

    if (condition == DistanceCondition::Near)
        sensor->setLowThreshold(d);
    else
        sensor->setHighThreshold(d);
    registerWithDal(sensor->id, (int)condition, handler);
}

/**
 * Get the distance.
 */
//% help=input/distance
//% blockId=device_distance block="distance in %unit"
//% parts="distance"
//% weight=26
float distance(DistanceUnit unit) {
    int distance = getWDistance()->sensor->getValue();
    switch (unit)
    {
        case DistanceUnit::Millimeter:
            return distance;
        case DistanceUnit::Centimeter:
            return distance / 10.;
        case DistanceUnit::Decimeter:
            return distance / 100.;
        case DistanceUnit::Meter:
            return distance / 1000.;
        default:
            return 0;
    }
}
}