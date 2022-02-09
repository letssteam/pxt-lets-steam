#include "pxt.h"

namespace pxt {

static DevicePin *pinArray[DEV_NUM_PINS] = {nullptr};

//%
DevicePin *getPin(int id) {
    id &= CFG_PIN_NAME_MSK;
    auto pinName = (PinNumber)id;
    uint8_t idx = 0;

    for (idx = 0; idx < DEV_NUM_PINS && pinArray[idx] != nullptr; ++idx) {
        if (pinArray[idx]->name == pinName) {
            return pinArray[idx];
        }
    }

    if (idx >= DEV_NUM_PINS)
        target_panic(PANIC_NO_SUCH_PIN);

    pinArray[idx] = new DevicePin(DEVICE_ID_IO_P0 + idx, pinName, IS_ANALOG_PIN(id) ? PIN_CAPABILITY_AD : PIN_CAPABILITY_DIGITAL);
    return pinArray[idx];
}

//%
DevicePin *getPinCfg(int key) {
    int p = getConfig(key, -1);
    if (p == -1)
        DMESG("no pin cfg: %d", key);
    return getPin(p);
}

void linkPin(int from, int to) {
    // if (from < 0 || from >= DEV_NUM_PINS)
    //     target_panic(PANIC_NO_SUCH_PIN);
    // getPin(to);
    // pinPos[from] = pinPos[to];
}

//%
DevicePin *lookupPin(int pinName) {
    if (pinName < 0 || pinName == 0xff)
        return NULL;
    pinName &= CFG_PIN_NAME_MSK;
    return getPin(pinName);
}

//%
DevicePin *lookupPinCfg(int key) {
    return lookupPin(getConfig(key));
}

CodalComponent *lookupComponent(int id) {
    for (int i = 0; i < DEVICE_COMPONENT_COUNT; ++i) {
        if (CodalComponent::components[i] && CodalComponent::components[i]->id == id)
            return CodalComponent::components[i];
    }
    return NULL;
}

} // namespace pxt

namespace pins {
/**
 * Get a pin by configuration id (DAL.CFG_PIN...)
 */
//%
DigitalInOutPin pinByCfg(int key) {
    return pxt::lookupPinCfg(key);
}

/**
 * Create a new zero-initialized buffer.
 * @param size number of bytes in the buffer
 */
//%
Buffer createBuffer(int size) {
    return mkBuffer(NULL, size);
}

/**
 * Get the duration of the last pulse in microseconds. This function should be called from a
 * ``onPulsed`` handler.
 */
//% help=pins/pulse-duration blockGap=8
//% blockId=pins_pulse_duration block="pulse duration (µs)"
//% weight=19
int pulseDuration() {
    return pxt::lastEvent.timestamp;
}
} // namespace pins
