#include "pxt.h"
#include "target_radioBLE.h"
#include "HCI_SPI.h"
#include "BLERemoteDevice.h"

#include <vector>

// CODAL_SPI spiBLE(*LOOKUP_PIN(BLE_SPI_MISO), *LOOKUP_PIN(BLE_SPI_MOSI), *LOOKUP_PIN(BLE_SPI_SCLK));
CODAL_SPI spiBLE(*lookupPin(43), *lookupPin(44), *lookupPin(42));
HCI_SPI *hci = new HCI_SPI(spiBLE, *lookupPin(61U), *lookupPin(70U), *lookupPin(8U));

char stringBuffer[32] = {0};

namespace pxt {
SINGLETON(WRadioBLE);

void WRadioBLE::configure() {
    if (isConfigured) {
        return;
    }

    ble = new BLEDevice_Component(12345, hci);
    ble->init();

    isConfigured = true;
}

} // namespace pxt

namespace magnetics {
String get_safe_string(std::vector<uint8_t> &data) {

    std::string result = "";

    for (auto c : data) {
        if (c >= 32 && c <= 126) {
            result += (char)c;
        }
    }

    return mkString(result.c_str(), result.size());
}

/**
 *  Start the device to sending data (by default the sending is activated)
 *
 */
//% blockId=ble_start_emitting block="Start Send mode"
//% help=magnetics/ble_start_emitting weight=95
void startEmitting() {
    auto radio = getWRadioBLE();
    radio->configure();

    radio->ble->startAdvertising();
    radio->isAdvertisingStarted = true;
}

/**
 *  Stop the device to sending data
 *
 */
//% blockId=ble_stop_emitting block="Stop Send mode"
//% help=magnetics/ble_stop_emitting weight=95
void stopEmitting() {
    auto radio = getWRadioBLE();
    radio->configure();

    radio->ble->stopAdvertising();
    radio->isAdvertisingStarted = false;
}

/**
 * Start the device to receiving data (by default the receiving is activated)
 *
 */
//% blockId=ble_start_scanning block="Start Scan mode"
//% help=magnetics/ble_start_scanning weight=91
void startScanning() {
    auto radio = getWRadioBLE();
    radio->configure();

    radio->ble->startScanning();
    radio->isScanningStarted = true;
}

/**
 * Stop the device to receiving data
 *
 */
//% blockId=ble_stop_scanning block="Stop Scan mode"
//% help=magnetics/ble_stop_scanning weight=91
void stopScanning() {
    auto radio = getWRadioBLE();
    radio->configure();

    radio->ble->stopScanning();
    radio->isScanningStarted = false;
}

/**
 * Set the BLE device local name
 *
 * @param name The name
 */
//% blockId=ble_set_local_name block="BLE device name : %name"
//% help=magnetics/ble_set_local_name weight=90
void setLocalName(String name) {
    auto radio = getWRadioBLE();
    radio->configure();

    radio->advData.setLocalName(name->getUTF8Data());
    radio->ble->setAdvertisingData(radio->advData);
}

/**
 * Send string data
 *
 */
//% blockId=ble_set_string_data block="BLE send string %data"
//% help=magnetics/ble_set_string_data weight=71
void setAdvertisingStringData(String data) {
    auto radio = getWRadioBLE();
    radio->configure();

    radio->scanData.setUserData(data->getUTF8Data());
    radio->ble->setScanResponseData(radio->scanData);
}

/**
 * Send "key:value" data
 *
 */
//% blockId=ble_set_keyvalue_data block="BLE send key %key: value %value"
//% help=magnetics/ble_set_keyvalue_data weight=70
void setAdvertisingKeyValueData(String key, float value) {
    auto radio = getWRadioBLE();
    radio->configure();

    int32_t intPart = (int32_t)value;
    int8_t fracPart = ((int32_t)value * 100) - (intPart * 100);
    int size = sprintf(stringBuffer, "%s:%d.%d", key->getUTF8Data(), intPart, fracPart);

    if (size < 0) {
        setAdvertisingStringData(mkString("ERROR. KEY/VALUE", 16));
    } else {
        setAdvertisingStringData(mkString(stringBuffer, size));
    }
}

/**
 * Is there any data from a device with specific name ?
 *
 */
//% blockId=ble_available_data_from_name block="is available BLE data from %name"
//% help=magnetics/ble_available_data_from_name weight=65
bool availableDataFromName(String name) {
    auto radio = getWRadioBLE();
    radio->configure();

    return radio->ble->availableScan(name->getUTF8Data()) > 0;
}

/**
 * Get the data from the device with a specific name (if there are multiple device with the same name, the first who emit will
 * be use)
 *
 */
//% blockId=ble_receive_data_from_name block="BLE receive data from %name"
//% help=magnetics/ble_receive_data_from_name weight=65
String readDataFromName(String name) {
    auto radio = getWRadioBLE();
    radio->configure();

    std::vector<BLERemoteDevice> result = radio->ble->getScanResult(name->getUTF8Data());

    if (result.size() > 0) {
        auto firstDevice = result[0];
        auto servicesDatas = firstDevice.getAllServiceDatas();

        if (servicesDatas.size() > 0) {
            return get_safe_string(servicesDatas[0].data);
        }
    }
    return mkString("", 0);
}

/**
 * Run some code when we receive new message from device
 */
//% blockId=ble_on_new_message block="on new message from %name"
//% help=magnetics/ble_on_new_message weight=60
void onNewMessageReceived(String name, Action handler) {}

} // namespace magnetics
