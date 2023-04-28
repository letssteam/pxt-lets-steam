// Auto-generated. Do not edit.
declare namespace input {

    /**
     * @brief Get the EC
     *
     * @param pin the pin where the sensor is connected
     * @return int
     */
    //% blockId=input_get_ec_value block="read ElectroConductivity on %pin in %unit"
    //% help=input/input_get_ec_value
    //% parts="ecmeter_sen0244"
    //% group="Electroconductivity" weight="90"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=220
    //% pin.fieldOptions.columns=4
    //% trackArgs=0 shim=input::getECValue
    function getECValue(pin: AnalogInPin, unit: ECUnit): number;
}

// Auto-generated. Do not edit. Really.
