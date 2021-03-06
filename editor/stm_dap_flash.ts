import { USBDevice } from "webusb";
import * as DAPjs from "dapjs";
import { ReadStream } from "fs";

const SERIAL_BAUDRATE = 115200;
const PERIOD_SERIAL_SEND_MS = 500;
const HEX_FILENAME = "binary.hex";


function log(msg: string, ...optionsParams: any[]){
    console.log(`STM DAP : ${msg}`, ...optionsParams);
}
function log_error(msg: string, ...optionsParams: any[]){
    console.error(`STM DAP : ${msg}`, ...optionsParams)
}


class STMDAPWrapper implements pxt.packetio.PacketIOWrapper {
    familyID: number;
    icon = "usb";

    private target : DAPjs.DAPLink = null;
    private lastSerialPrint : number = 0;
    private serialBuffer : string = "";


    constructor(public readonly io: pxt.packetio.PacketIO){
        this.familyID = 0x0D28; //this is the microbit vendor id, not quite UF2 family id

        this.io.onDeviceConnectionChanged = (connect) => {
            log("Device connection Changed !");
            this.disconnectAsync()
                .then( () => connect && this.reconnectAsync());
        }

        this.io.onData = (buf) => {
            log("Wrapper On DATA : " + pxt.Util.toHex(buf));
        }

        log("Print IO", this.io);
    }


    onSerial (buf: Uint8Array, isStderr: boolean) {
        log(`On Serial : \n\tBuf : '${buf}'\n\tisStderr : ${isStderr}`);
    };

    onCustomEvent (type: string, payload: Uint8Array) {
        log(`On Custom Event : \n\type : '${type}'\n\payload : ${payload}`);
    };

    async reconnectAsync(): Promise<void> {
        log("Reconnect");

        await this.io.reconnectAsync();
        await this.initDAP((this.io as any).dev, SERIAL_BAUDRATE);

        return Promise.resolve();
    }

    async disconnectAsync(): Promise<void> {
        log("Disconnected");

        if( this.target != null ){
            await this.target.disconnect();
            this.target.stopSerialRead();
            this.target = null;
        }

        this.serialBuffer = "";
        return Promise.resolve(); 
    }

    async reflashAsync(resp: pxtc.CompileResult): Promise<void> {
        log("resp : ", resp);

        var blob = new Blob([resp.outfiles[HEX_FILENAME]], {type: "text/plain"});
        const fileReader = new FileReader();

        fileReader.onloadend = (evt) => {
            this.flashDevice(evt.target.result);
        };

        fileReader.onprogress = (evt) => {
            log(`Blob progress : ${evt.loaded / evt.total * 100.0} %`);
        };

        fileReader.onerror = (evt) => {
            log_error("Failed to load Blob file : ", fileReader.error);
        };



        fileReader.readAsArrayBuffer(blob);

        return Promise.resolve();
    }

    sendCustomEventAsync(type: string, payload: Uint8Array): Promise<void> {
        throw new Error("Method not implemented.");
    }


    private async initDAP( device : USBDevice, baudrateSerial: number ){
        const transport = new DAPjs.WebUSB(device);
        this.target = new DAPjs.DAPLink(transport);

        this.target.on( DAPjs.DAPLink.EVENT_SERIAL_DATA, (data: string) => {
            this.serialBuffer += data;

            if( Date.now() - this.lastSerialPrint > PERIOD_SERIAL_SEND_MS ){
                this.processSerialLine(Buffer.from(this.serialBuffer));
                this.serialBuffer = "";
                this.lastSerialPrint = Date.now();
            }
        });


        await this.target.connect();
        await this.target.setSerialBaudrate(baudrateSerial);
        await this.target.disconnect();

        this.target.startSerialRead().catch( (e) => log_error("ERROR startSerial : ", e) );
        log("CONNECTED");
    }
    

    private processSerialLine(line: Uint8Array) {
        if (this.onSerial) {
            try {
                // catch encoding bugs
                this.onSerial(line, false);
            }
            catch (err) {
                log_error(`serial decoding error: ${err.message}`);
                pxt.tickEvent("hid.flash.serial.decode.error");
                log_error("", { err, line })
            }
        }
    }

    private flashProgress(prgs: any){
        log(`Flash progress : ${prgs*100}%`)
    }

    private async flashDevice(buffer: any) : Promise<void>{

        log("Array buf : ", buffer)

        this.target.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
            this.flashProgress(progress);
        });

        try{
            pxt.tickEvent("hid.flash.start");

            log("Stop Serial listening");
            this.target.stopSerialRead();

            log("Connect");
            await this.target.connect().catch( (e) => log_error("ERROR connect : ", e) );

            log("Flash");
            await this.target.flash(buffer).catch( (e) => log_error("ERROR flash : ", e) );

            log("Disconnect");
            await this.target.disconnect().catch( (e) => log_error("ERROR disconnect : ", e) );


            log("Start Serial listening");
            await this.target.startSerialRead().catch( (e) => log_error("ERROR startSerialRead : ", e) );
        }
        catch(error){
            log_error("Failed to flash : ", error);
            throw new Error("Failed to flash ");
        }

        pxt.tickEvent("hid.flash.success")
        return Promise.resolve();
    }
}




export function mkSTMDAPPacketIOWrapper(io: pxt.packetio.PacketIO): pxt.packetio.PacketIOWrapper {
    pxt.log(`packetio: mk wrapper STM_dap wrapper`)
    return new STMDAPWrapper(io);
}