// Auto-generated. Do not edit.
declare namespace magnetics {

    /**
     * Set the BLE device local name
     *
     * @param name The name
     */
    //% blockId=ble_set_local_name block="BLE device name : %name"
    //% help=magnetics/ble_set_local_name weight=90 shim=magnetics::setLocalName
    function setLocalName(name: string): void;

    /**
     * Send string data
     *
     */
    //% blockId=ble_set_user_string_data block="BLE send string %data"
    //% help=magnetics/ble_set_user_string_data weight=71 shim=magnetics::setAdvertisingUserStringData
    function setAdvertisingUserStringData(data: string): void;

    /**
     * Send "key:value" data
     *
     */
    //% blockId=ble_set_user_keyvalue_data block="BLE send key %key: value %value"
    //% help=magnetics/ble_set_user_keyvalue_data weight=70 shim=magnetics::setAdvertisingKeyValueData
    function setAdvertisingKeyValueData(key: string, value: number): void;

    /**
     * Is there any data from a device with specific name ?
     *
     */
    //% blockId=ble_available_data_from_name block="is available BLE data from %name"
    //% help=magnetics/ble_available_data_from_name weight=65 shim=magnetics::availableDataFromName
    function availableDataFromName(name: string): boolean;

    /**
     * Get the data from the device with a specific name (if there are multiple device with the same name, the first who emit will be
     * use)
     *
     */
    //% blockId=ble_receive_data_from_name block="BLE receive data from %name"
    //% help=magnetics/ble_receive_data_from_name weight=65 shim=magnetics::readDataFromName
    function readDataFromName(name: string): string;

    /**
     * Run some code when we receive new message from device
     */
    //% blockId=ble_on_new_message block="on new message from %name"
    //% help=magnetics/ble_on_new_message weight=60 shim=magnetics::onNewMessageReceived
    function onNewMessageReceived(name: string, handler: () => void): void;

    /**
     * Is device sending data
     *
     */
    //% blockId=ble_is_emitting block="is BLE sending"
    //% help=magnetics/ble_is_emitting weight=50 shim=magnetics::isEmitting
    function isEmitting(): boolean;

    /**
     * Is device receiving data
     *
     */
    //% blockId=ble_is_scanning block="is BLE receiving"
    //% help=magnetics/ble_is_scanning weight=50 shim=magnetics::isScanning
    function isScanning(): boolean;

    /**
     * Stop the device to receiving data
     *
     */
    //% blockId=ble_stop_scanning block="Stop BLE receiving data"
    //% help=magnetics/ble_stop_scanning weight=50 advanced=true shim=magnetics::stopScanning
    function stopScanning(): void;

    /**
     *  Stop the device to sending data
     *
     */
    //% blockId=ble_stop_emitting block="Stop BLE emitting data"
    //% help=magnetics/ble_stop_emitting weight=50 advanced=true shim=magnetics::stopEmitting
    function stopEmitting(): void;

    /**
     * Start the device to receiving data (by default the receiving is activated)
     *
     */
    //% blockId=ble_start_scanning block="Start BLE emitting data (duration scanning %ms)"
    //% help=magnetics/ble_start_scanning weight=50 advanced=true ms.defl=5000 shim=magnetics::starScanning
    function starScanning(ms?: uint16): void;

    /**
     *  Start the device to sending data (by default the sending is activated)
     *
     */
    //% blockId=ble_start_emitting block="Start BLE sending data (duration sending %ms)"
    //% help=magnetics/ble_start_emitting weight=50 advanced=true ms.defl=5000 shim=magnetics::startEmitting
    function startEmitting(ms?: uint16): void;

    /**
     * Set advertising user data
     *
     */
    //% blockId=ble_set_advertising_service block="advertise serice %uuidService with data %data"
    //% help=magnetics/ble_set_advertising_service advanced=true shim=magnetics::setAdvertisingService
    function setAdvertisingService(uuidService: int32, data: string): void;

    /**
     * Set manufacturer data
     *
     */
    //% blockId=ble_set_manufacturer_data block="advertise manufacturer id %id with data %data"
    //% help=magnetics/ble_set_manufacturer_data advanced=true shim=magnetics::setAdvertisingData
    function setAdvertisingData(id: int32, data: string): void;
}

// Auto-generated. Do not edit. Really.
