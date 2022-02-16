
namespace pxsim.Serial{

    let availableDevices: STMSerialDevice[] = new Array();

    export function internalCreateSerialDevice(tx: pins.DigitalInOutPin, rx: pins.DigitalInOutPin, id: number): STMSerialDevice {
        // const b = board() as EdgeConnectorBoard;
        // return b && b.edgeConnectorState ? b.edgeConnectorState.createSerialDevice(tx, rx, id) : new STMSerialDevice(tx, rx, id);

        let device = availableDevices.find( x => x.isPinMatch(tx, rx) );

        if( device == undefined ){
            device = new STMSerialDevice(tx, rx, id);
            availableDevices.push(device);
        }

        return device;
    }
}

namespace pxsim.STMSerialDeviceMethods {
    export function setTxBufferSize(device: Serial.STMSerialDevice, size: number) {
        device.setTxBufferSize(size);
    }
    export function setRxBufferSize(device: Serial.STMSerialDevice, size: number) {
        device.setRxBufferSize(size);
    }

    export function read(device: Serial.STMSerialDevice): number {
        return device.read();
    }

    export function readBuffer(device: Serial.STMSerialDevice): RefBuffer {
        return device.readBuffer();
    }

    export function writeBuffer(device: Serial.STMSerialDevice, buffer: RefBuffer) {
        device.writeBuffer(buffer);
    }

    export function setBaudRate(device: Serial.STMSerialDevice, rate: number) {
        device.setBaudRate(rate);
    }

    export function redirect(device: Serial.STMSerialDevice, tx: pins.DigitalInOutPin, rx: pins.DigitalInOutPin, rate: number) {
        device.redirect(tx, rx, rate);
    }

    export function onEvent(device: Serial.STMSerialDevice, event: number, handler: RefAction) {
        device.onEvent(event, handler);
    }

    export function onDelimiterReceived(device: Serial.STMSerialDevice, delimiter: number, handler: RefAction): void {
        device.onDelimiterReceived(delimiter, handler);
    }

    export function attachToConsole(device: Serial.STMSerialDevice){
        device.attachToConsole();
    }
}
