#include "pxt.h"
#include "serial-target.h"

namespace STMSerialDeviceMethods {
/**
 * Sets the size of the RX buffer in bytes
 */
//%
void setRxBufferSize(Serial::STMSerialDevice device, uint8_t size) {
    device->setRxBufferSize(size);
}

/**
 * Sets the size of the TX buffer in bytes
 */
//%
void setTxBufferSize(Serial::STMSerialDevice device, uint8_t size) {
    device->setTxBufferSize(size);
}

/**
Set the baud rate of the serial port
*/
//%
void setBaudRate(Serial::STMSerialDevice device, BaudRate rate) {
    device->setBaudRate((int)rate);
}

/**
 * Reads a single byte from the serial receive buffer. Negative if error, 0 if no data.
 */
//%
int read(Serial::STMSerialDevice device) {
    return device->read();
}

/**
 * Read the buffered received data as a buffer
 */
//%
Buffer readBuffer(Serial::STMSerialDevice device) {
    return device->readBuffer();
}

/**
 * Send a buffer across the serial connection.
 */
//%
void writeBuffer(Serial::STMSerialDevice device, Buffer buffer) {
    device->writeBuffer(buffer);
}

/**
 * Register code when a serial event occurs
 */
//%
void onEvent(Serial::STMSerialDevice device, SerialEvent event, Action handler) {
    device->onEvent(event, handler);
}

/**
 * Registers code when a delimiter is received
 **/
//%
void onDelimiterReceived(Serial::STMSerialDevice device, Delimiters delimiter, Action handler) {
    device->onDelimiterReceived(delimiter, handler);
}

/**
 * Attach serial output to console
 *
 */
//%
void attachToConsole(Serial::STMSerialDevice device) {
    return;
}

} // namespace STMSerialDeviceMethods
