/**
 * Reading and writing data over a serial connection.
 */
//% weight=2 color=#002050 icon="\uf287"
//% advanced=true blockGap=8
//% groups='["Write", "Read", "Events", "Configuration"]'
//% block="serial"
namespace Serial {
    export let NEW_LINE = "\r\n"; // \r require or Putty really unhappy on windows
    export let NEW_LINE_DELIMITER: Delimiters = Delimiters.NewLine;

    export class SerialWrapper {
        serialDevice: STMSerialDevice;
        decoder: UTF8Decoder;
        constructor(serialDevice: STMSerialDevice) {
            this.serialDevice = serialDevice;
            this.decoder = new UTF8Decoder();
        }

        readString(): string {
            const buf = this.serialDevice.readBuffer();
            this.decoder.add(buf);
            return this.decoder.decode();
        }

        readLine(timeOut?: number): string {
            return this.readUntil(NEW_LINE_DELIMITER, timeOut);
        }

        readUntil(delimiter: Delimiters, timeOut?: number): string {
            const start = control.millis();
            do {
                const s = this.decoder.decodeUntil(delimiter);
                if (s !== undefined)
                    return s;
                const b = this.serialDevice.readBuffer()
                this.decoder.add(b);
                pause(1);
            }
            while (timeOut === undefined || (control.millis() - start < timeOut));
            // giving up
            return "";
        }

        writeString(text: string) {
            if (!text) return;
            const buf = control.createBufferFromUTF8(text);
            this.serialDevice.writeBuffer(buf);
        }

        writeLine(text: string) {
            this.writeString(text);
            this.writeString(Serial.NEW_LINE);
        }
    }

    /**
    * Read the buffered received data as a string
    */
    //% help=serial/read-string
    //% blockId=serial_read_string block="serial|read string"
    //% weight=18
    //% group="Read"
    export function readString(): string {
        const d = device();
        return d ? d.readString() : "";
    }

    /**
     * Read a line of text from the serial port.
     */
    //% help=serial/read-line
    //% blockId=serial_read_line block="serial|read line"
    //% weight=20 blockGap=8
    //% group="Read"
    export function readLine(): string {
        const d = device();
        return d ? d.readLine() : "";
    }

    /**
     * Read a line of text from the serial port and return the buffer when the delimiter is met.
     * @param delimiter text delimiter that separates each text chunk
     */
    //% help=serial/read-until
    //% blockId=serial_read_until block="serial|read until %delimiter=serial_delimiter_conv"
    //% weight=19
    //% group="Read"    
    export function readUntil(delimiter: Delimiters, timeOut?: number): string {
        const d = device();
        return d ? d.readUntil(delimiter, timeOut) : "";
    }

    /**
     * Write some text to the serial port.
     */
    //% help=serial/write-string
    //% weight=87
    //% blockId=serial_writestring block="serial|write string %text"
    //% group="Write"
    export function writeString(text: string) {
        const d = device();
        if (d) d.writeString(text);
    }

    /**
     * Write a line of text to the serial port.
     * @param value to send over serial
     */
    //% weight=90
    //% help=serial/write-line blockGap=8
    //% blockId=serial_writeline block="serial|write line %text"
    //% group="Write"
    export function writeLine(text: string): void {
        const d = device();
        if (d) d.writeLine(text);
    }

    /**
     * Write a number to the serial port.
     */
    //% help=serial/write-number
    //% weight=89 blockGap=8
    //% blockId=serial_writenumber block="serial|write number %value"
    //% group="Write"
    export function writeNumber(value: number): void {
        writeString(value.toString());
    }

    /**
     * Write a name:value pair as a line of text to the serial port.
     * @param name name of the value stream, eg: "x"
     * @param value to write
     */
    //% weight=88 blockGap=8
    //% help=serial/write-value
    //% blockId=serial_writevalue block="serial|write value %name|= %value"
    //% group="Write"
    export function writeValue(name: string, value: number): void {
        if (name) {
            writeString(name);
            writeString(":");
        }
        writeNumber(value);
        writeString(NEW_LINE);
    }

    /**
    * Sets the size of the RX buffer in bytes
    */
    //% help=serial/set-rx-buffer-size
    //% blockId=serialsetrxbuffersize block="serial set rx buffer size to $size"
    //% weight=10
    //% group="Configuration"
    export function setRxBufferSize(size: number) {
        const ser = device();
        if (ser)
            ser.serialDevice.setRxBufferSize(size);
    }

    /**
    * Sets the size of the TX buffer in bytes
    */
    //% help=serial/set-tx-buffer-size
    //% blockId=serialsettxbuffersize block="serial set tx buffer size to $size"
    //% weight=9
    //% group="Configuration"
    export function setTxBufferSize(size: number) {
        const ser = device();
        if (ser)
            ser.serialDevice.setTxBufferSize(size);
    }

    /**
    * Reads a single byte from the serial receive buffer. Negative if error, 0 if no data.
    */
    //% Group="Read"
    export function read(): number {
        const ser = device();
        if (ser)
            return ser.serialDevice.read();
        else return DAL.DEVICE_NOT_SUPPORTED;
    }

    /**
    * Read the buffered received data as a buffer
    */
    //% help=serial/read-buffer
    //% blockId=serial_read_buffer block="serial|read buffer"
    //% weight=17
    //% group="Read"
    export function readBuffer(): Buffer {
        const ser = device();
        if (ser)
            return ser.serialDevice.readBuffer();
        else
            return control.createBuffer(0);
    }


    /**
    * Send a buffer across the serial connection.
    */
    //% help=serial/write-buffer weight=6
    //% blockId=serial_writebuffer block="serial|write buffer %buffer"
    //% group="Write"
    export function writeBuffer(buffer: Buffer) {
        const ser = device();
        if (ser)
            ser.serialDevice.writeBuffer(buffer);
    }

    /**
    Set the baud rate of the serial port
    */
    //% weight=10
    //% blockId=serial_setbaudrate block="serial|set baud rate %rate"
    //% blockGap=8 inlineInputMode=inline
    //% help=serial/set-baud-rate
    //% group="Configuration"
    export function setBaudRate(rate: BaudRate) {
        const ser = device();
        if (ser)
            ser.serialDevice.setBaudRate(rate);
    }

    /**
      Send console messages through the TX, RX pins
      **/
    //% blockId=serialsendtoconsole block="serial attach to console"
    //% group="Configuration"
    //% help=serial/attach-to-console
    export function attachToConsole() {
        const ser = device();
        if(ser)
            ser.serialDevice.attachToConsole();
    }



    /**
    * Registers code when serial events happen
    **/
    //% weight=9
    //% help=serial/on-event
    //% blockId=serial_onevent block="serial on %event"
    //% blockGap=8
    //% group="Events"
    export function onEvent(event: SerialEvent, handler: () => void) {
        const ser = device();
        if (ser)
            ser.serialDevice.onEvent(event, handler);
    }

    /**
    * Registers code when a delimiter is received
    **/
    //% weight=10
    //% help=serial/on-delimiter-received
    //% blockId=serial_ondelimiter block="serial on delimiter $delimiter received"
    //% blockGap=8
    //% group="Events"
    export function onDelimiterReceived(delimiter: Delimiters, handler: () => void) {
        const ser = device();
        if (ser)
            ser.serialDevice.onDelimiterReceived(delimiter, handler);
    }

    /**
     * Return the corresponding delimiter string
     */
    //% blockId="serial_delimiter_conv" block="%del"
    //% weight=1 blockHidden=true hidden=true
    export function delimiters(del: Delimiters): string {
        return String.fromCharCode(del as number);
    }
}
