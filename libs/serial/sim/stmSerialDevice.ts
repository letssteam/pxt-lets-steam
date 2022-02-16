
namespace pxsim.Serial{

    export class STMSerialDevice{
        private baudRate: number;
        private rxBuffer: RefBuffer;
        private txBuffer: RefBuffer;
        private isAttachToConsole: boolean;

        constructor(public tx: pins.DigitalInOutPin, public rx: pins.DigitalInOutPin, private id: number) {
            this.baudRate = 115200;
            this.setRxBufferSize(64);
            this.setTxBufferSize(64);
            this.isAttachToConsole = false;
        }

        isPinMatch(tx: pins.DigitalInOutPin, rx: pins.DigitalInOutPin){
            return this.tx == tx && this.rx == rx;
        }

        setTxBufferSize(size: number) {
            this.txBuffer = control.createBuffer(size);
        }

        setRxBufferSize(size: number) {
            this.rxBuffer = control.createBuffer(size);
        }

        read(): number {
            return -1;
        }

        readBuffer(): RefBuffer {
            const buf = control.createBuffer(0);
            return buf;
        }

        writeBuffer(buffer: any) {
            if( this.isAttachToConsole ){
                serialState().writeSerial(String.fromCharCode.apply(null, buffer.data));
            }
        }

        setBaudRate(rate: number) {
            this.baudRate = rate;
        }

        redirect(tx: pins.DigitalInOutPin, rx: pins.DigitalInOutPin, rate: number) {
            this.tx = tx;
            this.rx = rx;
            this.baudRate = rate;
        }

        onEvent(event: number, handler: RefAction) {
            pxsim.control.internalOnEvent(this.id, event, handler);
        }

        onDelimiterReceived(delimiter: number, handler: RefAction): void {
            // TODO
        }

        attachToConsole(){
            this.isAttachToConsole = true;
        }
    }

}