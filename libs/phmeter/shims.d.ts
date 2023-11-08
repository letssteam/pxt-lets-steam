// Auto-generated. Do not edit.
declare namespace input {

    /**
     * @brief Get the PH
     *
     * @param pin the pin where the sensor is connected
     * @return int
     */
    //% blockId=input_get_PH block="read pH from %pin"
    //% help=input/input_get_PH
    //% parts="phmeter"
    //% group="pH" weight="90"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=220
    //% pin.fieldOptions.columns=4
    //% trackArgs=0 shim=input::getPhmeterPh
    function getPhmeterPh(pin: AnalogInPin): int32;

    /**
     * Calibrate the pH-meter
     * @param pin the pin where the sensor is connected
     * @param offset the value to calibrate the pH-meter
     */
    //% help=output/output_calibrate_pHmeter
    //% blockId=output_calibrate_pHmeter block="Calibrate the pH-meter at %pin to %offset"
    //% parts="phmeter"
    //% group="pH" weight=5
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=220
    //% pin.fieldOptions.columns=4 shim=input::calibratePhmeter
    function calibratePhmeter(pin: AnalogInPin, offset_value: number): void;
}

// Auto-generated. Do not edit. Really.
