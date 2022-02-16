#include "pxt.h"
#include "serial-target.h"

namespace Serial {

static STMSerialDevice serialDevices(NULL);
/**
 * Opens a Serial communication driver
 */
//%
STMSerialDevice internalCreateSerialDevice(DigitalInOutPin tx, DigitalInOutPin rx, int id) {
    auto dev = serialDevices;
    while (dev) {
        if (dev->matchPins(tx, rx))
            return dev;
        dev = dev->next;
    }

    // allocate new one
    auto ser = new CodalSTMSerialDeviceProxy(tx, rx, id);
    ser->next = serialDevices;
    serialDevices = ser;
    return ser;
}

} // namespace Serial

namespace STMSerialDeviceMethods {

/**
 */
//%
void redirect(Serial::STMSerialDevice device, DigitalInOutPin tx, DigitalInOutPin rx, BaudRate rate) {
    device->redirect(tx, rx, rate);
}

} // namespace STMSerialDeviceMethods
