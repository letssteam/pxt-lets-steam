// Auto-generated. Do not edit.


    /** values for operating mode **/

declare namespace pxt {
}
declare namespace input {

    /**
     * @brief Get the Voltage measurement, the INA219 module must be placed *before* load to perform accurate voltage measurements
     *
     * @return float
     */
    //% blockId=input_get_ina219_voltage block="read voltage in V"
    //% help=input/input_get_ina219_voltage
    //% parts="ina219"
    //% group="Current & Voltage" weight="90" shim=input::getINA219Voltage
    function getINA219Voltage(): number;

    /**
     * @brief Get the Current measurement, the INA219 module must be placed *before* load to perform accurate voltage measurements
     *
     * @return float
     */
    //% blockId=input_get_ina219_current block="read current in mA"
    //% help=input/input_get_ina219_current
    //% parts="ina219"
    //% group="Current & Voltage" weight="90" shim=input::getINA219Current
    function getINA219Current(): number;

    /**
     * @brief Get the Power measurement, the INA219 module must be placed *before* load to perform accurate voltage measurements
     *
     * @return float
     */
    //% blockId=input_get_ina219_power block="read power in mW"
    //% help=input/input_get_ina219_power
    //% parts="ina219"
    //% group="Current & Voltage" weight="90" shim=input::getINA219Power
    function getINA219Power(): number;
}

// Auto-generated. Do not edit. Really.
