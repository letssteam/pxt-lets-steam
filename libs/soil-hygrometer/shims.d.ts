// Auto-generated. Do not edit.
declare namespace input {

    /**
     * @brief Get the Soil Humidity data
     *
     * @param pin the pin where the sensor is connected
     * @return int
     */
    //% blockId=input_get_soil_humidity block="read soil humidity from %pin"
    //% help=input/input_get_soil_humidity
    //% parts="soil_hygrometer"
    //% group="Soil Hygrometer" weight="90"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=220
    //% pin.fieldOptions.columns=4
    //% trackArgs=0 shim=input::getSoilHumidity
    function getSoilHumidity(pin: AnalogInPin): int32;
}

// Auto-generated. Do not edit. Really.
