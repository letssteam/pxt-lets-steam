// Auto-generated. Do not edit.



    //% color="#456F93" icon="\uf028" blockGap=8
declare namespace HCSR04 {

    /**
     * @brief Get the value of the sensor 
     *
     * @param unit the unit of the distance
     * @return uint16_t
     */
    //% block="get distance in %unit"
    //% blockId="hcsr04_get_distance"
    //% group="HCSR04" weight=76
    //% parts="hcsr04" shim=HCSR04::getDistance
    function getDistance(unit: MHCSR04Unit): uint16;

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
    //% parts="hcsr04" shim=HCSR04::onDistanceFrom
    function onDistanceFrom(fromDistanceIs: MDistanceBehold, distance: uint16, unit: MHCSR04Unit, handler: () => void): void;
}

// Auto-generated. Do not edit. Really.
