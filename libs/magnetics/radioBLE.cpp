#include "pxt.h"
#include "target_radioBLE.h"

// CODAL_SPI *spiBLE = pxt::getSPI(LOOKUP_PIN(BLE_SPI_MOSI), LOOKUP_PIN(BLE_SPI_MISO), LOOKUP_PIN(BLE_SPI_SCLK));
// CODAL_SPI spiBLE(*LOOKUP_PIN(BLE_SPI_MISO), *LOOKUP_PIN(BLE_SPI_MOSI), *LOOKUP_PIN(BLE_SPI_SCLK));
CODAL_SPI spiBLE(*lookupPin(43), *lookupPin(44), *lookupPin(42));
HCISpiTransportClass hci(&spiBLE, SPBTLE_RF, pinNametoDigitalPin((PinName)61U), pinNametoDigitalPin((PinName)70U),
                         pinNametoDigitalPin((PinName)8U), 8000000, 0);
BLELocalDevice BLEObj(&hci);
BLELocalDevice &BLE = BLEObj;

char stringBuffer[32] = {0};

namespace pxt {
SINGLETON(WRadioBLE);

void WRadioBLE::configure() {
    if (isConfigured) {
        return;
    }

    while (BLE.begin() == 0)
        ;
    advertising.begin();
    isConfigured = true;
} // namespace pxt

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
 * Set the BLE device local name
 *
 * @param name The name
 */
//% blockId=ble_set_local_name block="BLE device name : %name"
//% help=magnetics/ble_set_local_name weight=90
void setLocalName(String name) {
    getWRadioBLE()->configure();

    getWRadioBLE()->advertising.setLocalName(name->getUTF8Data());
}

/**
 * Send string data
 *
 */
//% blockId=ble_set_user_string_data block="BLE send string %data"
//% help=magnetics/ble_set_user_string_data weight=71
void setAdvertisingUserStringData(String data) {
    getWRadioBLE()->configure();

    getWRadioBLE()->advertising.clearData();
    getWRadioBLE()->advertising.setServiceData(0x181C, (uint8_t *)data->getUTF8Data(), data->getLength());
}

/**
 * Send "key:value" data
 *
 */
//% blockId=ble_set_user_keyvalue_data block="BLE send key %key: value %value"
//% help=magnetics/ble_set_user_keyvalue_data weight=70
void setAdvertisingKeyValueData(String key, float value) {
    getWRadioBLE()->configure();

    int32_t intPart = (int32_t)value;
    int8_t fracPart = ((int32_t)value * 100) - (intPart * 100);

    int size = sprintf(stringBuffer, "%s:%d.%d", key->getUTF8Data(), intPart, fracPart);

    getWRadioBLE()->advertising.clearData();
    if (size < 0) {
        getWRadioBLE()->advertising.setServiceData(0x181C, (uint8_t *)"ERROR. KEY/VALUE", 16);
    } else {
        getWRadioBLE()->advertising.setServiceData(0x181C, (uint8_t *)stringBuffer, size);
    }
}

/**
 * Is there any data from a device with specific name ?
 *
 */
//% blockId=ble_available_data_from_name block="is available BLE data from %name"
//% help=magnetics/ble_available_data_from_name weight=65
bool availableDataFromName(String name) {
    getWRadioBLE()->configure();

    if (getWRadioBLE()->advertising.hasResultWithAdvertisingData()) {
        BLEDevice results[16];
        size_t size = getWRadioBLE()->advertising.getResultWithAdvertisingData(results, 16);

        for (size_t i = 0; i < size; ++i) {

            if (strcmp(results[i].localName().c_str(), name->getUTF8Data()) == 0) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Get the data from the device with a specific name (if there are multiple device with the same name, the first who emit will be
 * use)
 *
 */
//% blockId=ble_receive_data_from_name block="BLE receive data from %name"
//% help=magnetics/ble_receive_data_from_name weight=65
String readDataFromName(String name) {
    getWRadioBLE()->configure();

    if (getWRadioBLE()->advertising.hasResultWithAdvertisingData()) {
        BLEDevice results[16];
        size_t size = getWRadioBLE()->advertising.getResultWithAdvertisingData(results, 16);

        for (size_t i = 0; i < size; ++i) {

            if (strcmp(results[i].localName().c_str(), name->getUTF8Data()) == 0) {
                std::vector<uint8_t> data = results[i].getAdvertisingData();
                return get_safe_string(data);
            }
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

/**
 * Is device sending data
 *
 */
//% blockId=ble_is_emitting block="is BLE sending"
//% help=magnetics/ble_is_emitting weight=50
bool isEmitting() {
    getWRadioBLE()->configure();
    return getWRadioBLE()->advertising.isEmitting();
}

/**
 * Is device receiving data
 *
 */
//% blockId=ble_is_scanning block="is BLE receiving"
//% help=magnetics/ble_is_scanning weight=50
bool isScanning() {
    getWRadioBLE()->configure();
    return getWRadioBLE()->advertising.isScanning();
}

/**
 * Stop the device to receiving data
 *
 */
//% blockId=ble_stop_scanning block="Stop BLE receiving data"
//% help=magnetics/ble_stop_scanning weight=50 advanced=true
void stopScanning() {
    getWRadioBLE()->configure();
    getWRadioBLE()->advertising.setDurationScanning(0);
}

/**
 *  Stop the device to sending data
 *
 */
//% blockId=ble_stop_emitting block="Stop BLE emitting data"
//% help=magnetics/ble_stop_emitting weight=50 advanced=true
void stopEmitting() {
    getWRadioBLE()->configure();
    getWRadioBLE()->advertising.setDurationEmitting(0);
}

/**
 * Start the device to receiving data (by default the receiving is activated)
 *
 */
//% blockId=ble_start_scanning block="Start BLE emitting data (duration scanning %ms)"
//% help=magnetics/ble_start_scanning weight=50 advanced=true
void starScanning(uint16_t ms = 5000) {
    getWRadioBLE()->configure();
    getWRadioBLE()->advertising.setDurationScanning(ms);
}

/**
 *  Start the device to sending data (by default the sending is activated)
 *
 */
//% blockId=ble_start_emitting block="Start BLE sending data (duration sending %ms)"
//% help=magnetics/ble_start_emitting weight=50 advanced=true
void startEmitting(uint16_t ms = 5000) {
    getWRadioBLE()->configure();
    getWRadioBLE()->advertising.setDurationEmitting(ms);
}

/**
 * Set advertising user data
 *
 */
//% blockId=ble_set_advertising_service block="advertise serice %uuidService with data %data"
//% help=magnetics/ble_set_advertising_service advanced=true
void setAdvertisingService(int uuidService, String data) {
    getWRadioBLE()->configure();
    getWRadioBLE()->advertising.setServiceData(uuidService, (uint8_t *)data->getUTF8Data(), data->getLength());
}

/**
 * Set manufacturer data
 *
 */
//% blockId=ble_set_manufacturer_data block="advertise manufacturer id %id with data %data"
//% help=magnetics/ble_set_manufacturer_data advanced=true
void setAdvertisingData(int id, String data) {
    getWRadioBLE()->configure();
    getWRadioBLE()->advertising.setManufacturerData(id, (uint8_t *)data->getUTF8Data(), data->getLength());
}

} // namespace magnetics
