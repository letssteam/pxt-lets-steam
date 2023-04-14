// Auto-generated. Do not edit.
declare namespace input {

    /**
     * @brief Get the CO2 concentration
     *
     * @param pin the pin where the sensor is connected
     * @return int
     */
    //% blockId=input_get_ec_value block="read ElectroConductivity in %unit on %pin"
    //% help=input/input_get_ec_value
    //% parts="ecmeter_sen0244"
    //% group="Electroconductivity" weight="90"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=220
    //% pin.fieldOptions.columns=4
    //% trackArgs=0 shim=input::getECValue
    function getECValue(unit: ECUnit, pin: DigitalInOutPin): int32;
}

// Auto-generated. Do not edit. Really.
