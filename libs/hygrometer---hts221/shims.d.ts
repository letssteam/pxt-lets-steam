// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Run some code when the humidity changes from dry to wet, or from wet to dry.
     * @param condition the condition, wet or dry, the event triggers on
     * @param humidity the humidity at which this event happens, eg: 50
     * @param unit the unit of the humidity
     */
    //% blockId=input_on_humidity_condition_changed block="on humidity %condition|at %humidity percent"
    //% help=input/on-humidity-condition-changed blockExternalInputs=0
    //% parts="humidity"
    //% group="More" weight=76 shim=input::onHumidityConditionChanged
    function onHumidityConditionChanged(condition: HumidityCondition, humidity: int32, handler: () => void): void;

    /**
     * Get the relative humidity in percent.
     */
    //% help=input/humidity
    //% blockId=device_humidity block="relative humidity in percent"
    //% parts="humidity"
    //% weight=26 shim=input::humidity
    function humidity(): int32;
}

// Auto-generated. Do not edit. Really.
