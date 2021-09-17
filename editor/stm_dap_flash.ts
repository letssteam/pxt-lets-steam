import { USBDevice } from "webusb";
import * as DAPjs from "dapjs";

const SERIAL_BAUDRATE = 115200;
const PERIOD_SERIAL_SEND_MS = 500;
const HEX_FILENAME = "binary.hex";


function log(msg: string, ...optionsParams: any[]){
    console.log(`STM DAP : ${msg}`, ...optionsParams);
}
function log_error(msg: string, ...optionsParams: any[]){
    console.error(`STM DAP : ${msg}`, ...optionsParams)
}


export class STMDAPWrapper implements pxt.packetio.PacketIOWrapper {
    familyID: number;
    icon = "usb";

    public onFlashProgress : (prg: number) => void = null;
    public onFlashFinish : (error: any) => void = null;

    private target : DAPjs.DAPLink = null;
    private lastSerialPrint : number = 0;
    private serialBuffer : string = "";
    private lock_serial = false;


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
        await this.initDAP((this.io as any).dev);
        await this.startSerial(SERIAL_BAUDRATE);

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
        var blob = new Blob([resp.outfiles[HEX_FILENAME]], {type: "text/plain"});
        const fileReader = new FileReader();

        console.log(resp);
        // TODO : Remove useless part of the file to speed up the upload

        fileReader.onloadend = (evt) => {
            return this.flashDevice(evt.target.result);
        };

        fileReader.onprogress = (evt) => {
            log(`Blob progress : ${evt.loaded / evt.total * 100.0} %`);
        };

        fileReader.onerror = (evt) => {
            log_error("Failed to load Blob file : ", fileReader.error);
            return Promise.reject();
        };

        fileReader.readAsArrayBuffer(blob);
    }

    sendCustomEventAsync(type: string, payload: Uint8Array): Promise<void> {
        throw new Error("Method not implemented.");
    }


    private async initDAP( device : USBDevice ){
        const transport = new DAPjs.WebUSB(device);
        this.target = new DAPjs.DAPLink(transport);

        log("DAP initialized !");
    }

    private async startSerial(baudrateSerial: number){

        if(this.lock_serial){
            return;
        }

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
        log("Serial Started");
    }

    private async stopSerial(){
        this.target.on(DAPjs.DAPLink.EVENT_SERIAL_DATA, (data: string) => {});
        this.target.stopSerialRead();
        log("Serial Stopped");
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

    private async flashDevice(buffer: any) : Promise<void>{

        var errorCatch = null;
        log(`Flashing file ${buffer.byteLength} words long`);

        this.target.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
            if( this.onFlashProgress != null ){
                this.onFlashProgress(progress);
            }
        });

        try{
            pxt.tickEvent("hid.flash.start");

            this.lock_serial = true;
            this.stopSerial();

            log("Connect");
            await this.target.connect().catch( (e) => {log_error("ERROR connect : ", e); throw e;} );

            log("Flash");
            await this.target.flash(buffer).catch( (e) => {log_error("ERROR flash : ", e); throw e;} );

            log("Disconnect");
            await this.target.disconnect().catch( (e) => {log_error("ERROR disconnect : ", e); throw e;} );

        }
        catch(error){
            errorCatch = error;
            log_error("Failed to flash : ", error);
            return Promise.reject();
        }
        finally{
            this.lock_serial = false;
            this.startSerial(SERIAL_BAUDRATE);

            if( this.onFlashFinish != null ){
                this.onFlashFinish(errorCatch);
            }
        }

        pxt.tickEvent("hid.flash.success")
        return Promise.resolve();
    }
}




export function mkSTMDAPPacketIOWrapper(io: pxt.packetio.PacketIO): pxt.packetio.PacketIOWrapper {
    pxt.log(`packetio: mk wrapper STM_dap wrapper`)
    return new STMDAPWrapper(io);
}
