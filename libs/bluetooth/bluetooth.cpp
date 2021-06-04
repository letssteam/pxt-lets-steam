
#include "Event.h"
#include "pxt.h"
#include "target_bluetooth.h"
#include <string>
#include <vector>

using namespace std;

enum class BLE_Serial_Delimiters {
    //% block="new line (\n)"
    NewLine = 10,
    //% block=","
    Comma = 44,
    //% block="$"
    Dollar = 36,
    //% block=":"
    Colon = 58,
    //% block="."
    Fullstop = 46,
    //% block="#"
    Hash = 35,
    //% block="carriage return (\r)"
    CarriageReturn = 13,
    //% block="space"
    Space = 32,
    //% block="tab (\t)"
    Tab = 9,
    //% block="|"
    Pipe = 124,
    //% block=";"
    SemiColon = 59,
};

STM32IotNode inode;
HCISpiTransportClass hci(inode.spi3, SPBTLE_RF, pinNametoDigitalPin(PD_13),
                         pinNametoDigitalPin(PE_6), pinNametoDigitalPin(PA_8), 8000000, 0);
BLELocalDevice objBLE(&hci);
BLELocalDevice &BLE = objBLE;

namespace pxt {
SINGLETON(WBluetooth);
}

/**
 * Support for additional Bluetooth services.
 */
//% color=#0082FB weight=96 icon="\uf294"
namespace bluetooth {

/**
 *  Starts the Bluetooth accelerometer service
 */
//% help=bluetooth/start-accelerometer-service
//% blockId=bluetooth_start_accelerometer_service block="bluetooth accelerometer service"
//% parts="bluetooth" weight=90 blockGap=8
void startAccelerometerService() {}

/**
 *  Starts the Bluetooth button service
 */
//% help=bluetooth/start-button-service
//% blockId=bluetooth_start_button_service block="bluetooth button service" blockGap=8
//% parts="bluetooth" weight=89
void startButtonService() {}

/**
 *  Starts the Bluetooth IO pin service.
 */
//% help=bluetooth/start-io-pin-service
//% blockId=bluetooth_start_io_pin_service block="bluetooth io pin service" blockGap=8
//% parts="bluetooth" weight=88
void startIOPinService() {}

/**
 *  Starts the Bluetooth LED service
 */
//% help=bluetooth/start-led-service
//% blockId=bluetooth_start_led_service block="bluetooth led service" blockGap=8
//% parts="bluetooth" weight=87
void startLEDService() {}

/**
 *  Starts the Bluetooth temperature service
 */
//% help=bluetooth/start-temperature-service
//% blockId=bluetooth_start_temperature_service block="bluetooth temperature service" blockGap=8
//% parts="bluetooth" weight=86
void startTemperatureService() {}

/**
 *  Starts the Bluetooth magnetometer service
 */
//% help=bluetooth/start-magnetometer-service
//% blockId=bluetooth_start_magnetometer_service block="bluetooth magnetometer service"
//% parts="bluetooth" weight=85
void startMagnetometerService() {}

/**
 *  Starts the Bluetooth UART service
 */
//% help=bluetooth/start-uart-service
//% blockId=bluetooth_start_uart_service block="bluetooth uart service"
//% parts="bluetooth" advanced=true
void startUartService() {

    BLE.stopAdvertise();
    getWBluetooth()->startSerial();
    BLE.setAdvertisedService(getWBluetooth()->serialBle->getService());
    BLE.advertise();
}

//%
void uartWriteString(String data) {
    getWBluetooth()->serialBle->send(data->getUTF8Data());
}

//%
String uartReadUntil(String del) {
    string str;

    if (del->getLength() == 0) {
        str = getWBluetooth()->serialBle->read();
    } else {
        str = getWBluetooth()->serialBle->readUntil(*del->getUTF8DataAt(0));
    }

    return mkString(str.data(), str.size());
}

/**
 * Sends a buffer of data via Bluetooth UART
 */
//%
void uartWriteBuffer(Buffer buffer) {
    getWBluetooth()->serialBle->sendBuffer(buffer->data, buffer->length);
}

/**
 * Reads buffered UART data into a buffer
 */
//%
Buffer uartReadBuffer() {
    vector<uint8_t> buffer = getWBluetooth()->serialBle->readBuffer();
    return mkBuffer(buffer.data(), buffer.size());
}

/**
 * Registers an event to be fired when one of the delimiter is matched.
 * @param delimiters the characters to match received characters against.
 */
//% help=bluetooth/on-uart-data-received
//% weight=18 blockId=bluetooth_on_data_received
//% block="bluetooth|on data received %delimiters=ble_serial_delimiter_conv"
void onUartDataReceived(String delimiters, Action body) {

    if (delimiters->getLength() == 0) {
        return;
    }

    getWBluetooth()->serialBle->onDelimiterReceived(delimiters->getUTF8DataAt(0)[0]);
    registerWithDal(STM32_ID_BLE_SERIAL, STM32_BLE_EVT_DELIMITER, body);
}

/**
 * Register code to run when the micro:bit is connected to over Bluetooth
 * @param body Code to run when a Bluetooth connection is established
 */
//% help=bluetooth/on-bluetooth-connected weight=20
//% blockId=bluetooth_on_connected block="on bluetooth connected" blockGap=8
//% parts="bluetooth"
void onBluetoothConnected(Action body) {
    BLE.setEventHandler(BLEConnected, [](BLEDevice device) {
        codal::Event(STM32_ID_BLE, STM32_BLE_EVT_CONNECTED);
    });

    registerWithDal(STM32_ID_BLE, STM32_BLE_EVT_CONNECTED, body);
}

/**
 * Register code to run when a bluetooth connection to the micro:bit is lost
 * @param body Code to run when a Bluetooth connection is lost
 */
//% help=bluetooth/on-bluetooth-disconnected weight=19
//% blockId=bluetooth_on_disconnected block="on bluetooth disconnected"
//% parts="bluetooth"
void onBluetoothDisconnected(Action body) {
    BLE.setEventHandler(BLEDisconnected, [](BLEDevice device) {
        codal::Event(STM32_ID_BLE, STM32_BLE_EVT_DISCONNECTED);
    });

    registerWithDal(STM32_ID_BLE, STM32_BLE_EVT_DISCONNECTED, body);
}

const int8_t CALIBRATED_POWERS[] = {-49, -37, -33, -28, -25, -20, -15, -10};
/**
 * Advertise an Eddystone URL
 * @param url the url to transmit. Must be no longer than the supported eddystone url length, eg:
 * "https://makecode.com"
 * @param power power level between 0 and 7, eg: 7
 * @param connectable true to keep bluetooth connectable for other services, false otherwise.
 */
//% blockId=eddystone_advertise_url
//% block="bluetooth advertise url %url|with power %power|connectable %connectable"
//% parts=bluetooth weight=11 blockGap=8
//% help=bluetooth/advertise-url blockExternalInputs=1
//% hidden=1 deprecated=1
void advertiseUrl(String url, int power, bool connectable) {}

/**
 * Advertise an Eddystone UID
 * @param nsAndInstance 16 bytes buffer of namespace (bytes 0-9) and instance (bytes 10-15)
 * @param power power level between 0 and 7, eg: 7
 * @param connectable true to keep bluetooth connectable for other services, false otherwise.
 */
//% parts=bluetooth weight=12 advanced=true deprecated=1
void advertiseUidBuffer(Buffer nsAndInstance, int power, bool connectable) {}

/**
 * Sets the bluetooth transmit power between 0 (minimal) and 7 (maximum).
 * @param power power level between 0 (minimal) and 7 (maximum), eg: 7.
 */
//% parts=bluetooth weight=5 help=bluetooth/set-transmit-power advanced=true
//% blockId=bluetooth_settransmitpower block="bluetooth set transmit power %power"
void setTransmitPower(int power) {}

/**
 * Stops advertising Eddystone end points
 */
//% blockId=eddystone_stop_advertising block="bluetooth stop advertising"
//% parts=bluetooth weight=10
//% help=bluetooth/stop-advertising advanced=true
//% hidden=1 deprecated=1
void stopAdvertising() {}
} // namespace bluetooth