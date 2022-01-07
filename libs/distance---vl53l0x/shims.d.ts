// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Run some code when the distance changes from near to far, or from far to near.
     * @param condition the condition, far or near, the event triggers on
     * @param distance the distance at which this event happens, eg: 15
     * @param unit the unit of the distance
     */
    //% blockId=input_on_distance_condition_changed block="on distance %condition|at %distance|%unit"
    //% parts="distance"
    //% help=input/on-distance-condition-changed blockExternalInputs=0
    //% group="Distance" weight=76 shim=input::onDistanceConditionChanged
    function onDistanceConditionChanged(condition: DistanceCondition, distance: int32, unit: DistanceUnit, handler: () => void): void;

    /**
     * Get the distance.
     */
    //% help=input/distance
    //% blockId=device_distance block="distance in %unit"
    //% parts="distance"
    //% group="Distance"
    //% weight=26 shim=input::distance
    function distance(unit: DistanceUnit): number;
}

// Auto-generated. Do not edit. Really.
