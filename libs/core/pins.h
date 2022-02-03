#ifndef __PXT_PINS_H
#define __PXT_PINS_H

#define CFG_PIN_BTN_USER 94
#define CFG_PIN_RESET 95

#define CFG_PIN_HTS221_SDA 96
#define CFG_PIN_HTS221_SCL 97

#define CFG_PIN_LPS22HB_SDA 98
#define CFG_PIN_LPS22HB_SCL 99

#define CFG_PIN_VL53L0X_SDA 132
#define CFG_PIN_VL53L0X_SCL 133
#define CFG_PIN_VL53L0X_SHUT 134

#define CFG_PIN_LSM6DSL_SDA 135
#define CFG_PIN_LSM6DSL_SCL 136

#define CFG_PIN_BLE_SPI_MISO 183
#define CFG_PIN_BLE_SPI_MOSI 184
#define CFG_PIN_BLE_SPI_SCLK 185
#define CFG_PIN_BLE_SPI_CS 186
#define CFG_PIN_BLE_SPI_IRQ 187
#define CFG_PIN_BLE_RST 188

#define CFG_PIN_WIFI_ISM43362_MOSI 189
#define CFG_PIN_WIFI_ISM43362_MISO 190
#define CFG_PIN_WIFI_ISM43362_SCK 191
#define CFG_PIN_WIFI_ISM43362_CS 192
#define CFG_PIN_WIFI_ISM43362_COMMAND_DATA_READY 193
#define CFG_PIN_WIFI_ISM43362_RESET 194
#define CFG_PIN_WIFI_ISM43362_WAKE_UP 195

#define BUTTON_ACTIVE_HIGH_PULL_DOWN (ACTIVE_HIGH | 0x10)
#define BUTTON_ACTIVE_HIGH_PULL_UP (ACTIVE_HIGH | 0x20)
#define BUTTON_ACTIVE_HIGH_PULL_NONE (ACTIVE_HIGH | 0x30)
#define BUTTON_ACTIVE_LOW_PULL_DOWN (ACTIVE_LOW | 0x10)
#define BUTTON_ACTIVE_LOW_PULL_UP (ACTIVE_LOW | 0x20)
#define BUTTON_ACTIVE_LOW_PULL_NONE (ACTIVE_LOW | 0x30)

#define PIN(name) ((PinName)pxt::getConfig(CFG_PIN_##name, -1))
#define LOOKUP_PIN(name) pxt::lookupPin(PIN(name))

// these can be overridden in platform.h
#ifndef CODAL_PIN
#define CODAL_PIN CODAL_MBED::Pin
#endif

#ifndef CODAL_TIMER
#define CODAL_TIMER CODAL_MBED::Timer
#endif

#ifndef CODAL_SPI
#define CODAL_SPI CODAL_MBED::SPI
#endif

#ifndef CODAL_SERIAL
#define CODAL_SERIAL CODAL_MBED::Serial
#endif

#ifndef IS_ANALOG_PIN
#define IS_ANALOG_PIN(id) ((DEV_ANALOG_PINS >> (id)) & 1)
#endif

typedef CODAL_PIN DevicePin;

typedef DevicePin *DigitalInOutPin;
typedef DevicePin *AnalogInOutPin;
typedef DevicePin *AnalogInPin;
typedef DevicePin *AnalogOutPin;
typedef DevicePin *PwmPin;
typedef DevicePin *PwmOnlyPin;
typedef Button *Button_;

namespace pxt {
DevicePin *getPin(int id);
DevicePin *getPinCfg(int key);
DevicePin *lookupPin(int pinName);
DevicePin *lookupPinCfg(int key);
void linkPin(int from, int to);
CodalComponent *lookupComponent(int id);
} // namespace pxt

#define PINOP(op) name->op

#endif
