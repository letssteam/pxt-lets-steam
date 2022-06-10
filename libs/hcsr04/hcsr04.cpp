#include "pxt.h"
#include "target_hcsr04.h"

enum class MHCSR04Unit {
    //% block="m"
    M = 0, 
    //% block="dm"
    Dm = 1, 
    //% block="cm"
    Cm = 2, 
    //% block="mm"
    Mm = 3
};

enum class MDistanceBehold {
    //% block="Near"
    Near = 0, 
    //% block="Far"
    Far = 1
};


namespace pxt {
    SINGLETON(WHCSR04);
}

//% color="#456F93" icon="\uf028" blockGap=8
namespace HCSR04 {
    
/**
 * @brief Get the value of the sensor 
 *
 * @param unit the unit of the distance
 * @return uint16_t
 */
//% block="get distance in %unit"
//% blockId="hcsr04_get_distance"
//% group="HCSR04" weight=76
//% parts="hcsr04"
uint16_t getDistance(MHCSR04Unit unit) {
    return getWHCSR04()->hcsr04->getDistance(static_cast<codal::HCSR04Unit>(unit));
}

void callActionNear() {
    runInParallel(getWHCSR04()->actNear);
}

void callActionFar() {
    runInParallel(getWHCSR04()->actFar);
}

/**
 * @brief Creates a new event that triggers when the sensor is near or far of the distance
 *
 * @param fromDistanceIs the direction that triggers the event
 * @param distance the value 
 * @param unit the unit of the distance
 * @param handler what the event does
 */
//% block="on distance %fromDistanceIs from %distance %unit"
//% blockId="hcsr04_register_distance_event"
//% group="HCSR04" weight=67
//% parts="hcsr04"
void onDistanceFrom(MDistanceBehold fromDistanceIs, uint16_t distance, MHCSR04Unit unit, Action handler) {
    switch (fromDistanceIs)
    {
    case MDistanceBehold::Near : 
        getWHCSR04()->actNear = handler;
        getWHCSR04()->hcsr04->registerDistanceEvent(static_cast<codal::DistanceBehold>(fromDistanceIs), distance, static_cast<codal::HCSR04Unit>(unit), callActionNear);
        break;
    case MDistanceBehold::Far : 
        getWHCSR04()->actFar = handler;
        getWHCSR04()->hcsr04->registerDistanceEvent(static_cast<codal::DistanceBehold>(fromDistanceIs), distance, static_cast<codal::HCSR04Unit>(unit), callActionFar);
        break;
    default:
        break;
    }
}
 
} // namespace HCSR04
