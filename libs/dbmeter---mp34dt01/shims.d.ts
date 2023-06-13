// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Run some code when the distance changes from near to far, or from far to near.
     * @param condition the condition, higher or lower, the event triggers on
     * @param value the value at which this event happens, eg: 80
     */
    //% blockId=input_on_dbmeter_condition_changed block="on decibel %condition|at %distance"
    //% parts="dbmeter"
    //% help=input/input_on_dbmeter_condition_changed blockExternalInputs=0
    //% group="dB Meter" weight=76 shim=input::ondbMeterConditionChanged
    function ondbMeterConditionChanged(condition: DBMeterCondition, value: int32, handler: () => void): void;

    /**
     * @brief Get the decibel value
     */
    //% help=input/decibel
    //% blockId=device_decibel block="get decibel"
    //% parts="dbmeter"
    //% group="dB Meter"
    //% weight=26 shim=input::decibel
    function decibel(): int32;
}

// Auto-generated. Do not edit. Really.
