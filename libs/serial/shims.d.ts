// Auto-generated. Do not edit.
declare namespace Serial {

    /**
     * Opens a Serial communication driver
     */
    //% shim=Serial::internalCreateSerialDevice
    function internalCreateSerialDevice(tx: DigitalInOutPin, rx: DigitalInOutPin, id: int32): STMSerialDevice;
}


declare interface STMSerialDevice {
    /**
     */
    //% shim=STMSerialDeviceMethods::redirect
    redirect(tx: DigitalInOutPin, rx: DigitalInOutPin, rate: BaudRate): void;
}


declare interface STMSerialDevice {
    /**
     * Sets the size of the RX buffer in bytes
     */
    //% shim=STMSerialDeviceMethods::setRxBufferSize
    setRxBufferSize(size: uint8): void;

    /**
     * Sets the size of the TX buffer in bytes
     */
    //% shim=STMSerialDeviceMethods::setTxBufferSize
    setTxBufferSize(size: uint8): void;

    /**
    Set the baud rate of the serial port
     */
    //% shim=STMSerialDeviceMethods::setBaudRate
    setBaudRate(rate: BaudRate): void;

    /**
     * Reads a single byte from the serial receive buffer. Negative if error, 0 if no data.
     */
    //% shim=STMSerialDeviceMethods::read
    read(): int32;

    /**
     * Read the buffered received data as a buffer
     */
    //% shim=STMSerialDeviceMethods::readBuffer
    readBuffer(): Buffer;

    /**
     * Send a buffer across the serial connection.
     */
    //% shim=STMSerialDeviceMethods::writeBuffer
    writeBuffer(buffer: Buffer): void;

    /**
     * Register code when a serial event occurs
     */
    //% shim=STMSerialDeviceMethods::onEvent
    onEvent(event: SerialEvent, handler: () => void): void;

    /**
     * Registers code when a delimiter is received
     **/
    //% shim=STMSerialDeviceMethods::onDelimiterReceived
    onDelimiterReceived(delimiter: Delimiters, handler: () => void): void;

    /**
     * Attach serial output to console
     *
     */
    //% shim=STMSerialDeviceMethods::attachToConsole
    attachToConsole(): void;
}

// Auto-generated. Do not edit. Really.
