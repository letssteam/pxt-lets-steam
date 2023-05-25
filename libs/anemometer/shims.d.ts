// Auto-generated. Do not edit.
declare namespace input {

    /**
     * @brief Get the anemometer cup rotation frequency
     *
     * @param pin the pin where the anemometer is connected
     * @param timeSpan the time length of the measurement in seconds
     * @param unit the measurement unit
     * @return int
     */
    //% blockId=input_anemometer_get_rotation_per_unit block="get anemometer rotation on %pin for %timeSpan seconds in %unit"
    //% help=input/anemometer_get_rotation_per_unit
    //% parts=anemometer
    //% group="Anemometer" weight="90"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=220
    //% pin.fieldOptions.columns=4
    //% timeSpan.min=0 timeSpan.max=10
    //% trackArgs=0
    //% promise timeSpan.defl=1 shim=input::getAnemometerRotationPerUnit
    function getAnemometerRotationPerUnit(pin: DigitalInOutPin, unit: AnemometerUnit, timeSpan?: int32): int32;

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
    //% timeSpan.min=1 timeSpan.max=10
    //% trackArgs=0
    //% promise timeSpan.defl=1 shim=input::getAnemometerRotation
    function getAnemometerRotation(pin: DigitalInOutPin, timeSpan?: int32): int32;
}

// Auto-generated. Do not edit. Really.
