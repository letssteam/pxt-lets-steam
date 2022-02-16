namespace pxsim {
    const SERIAL_BUFFER_LENGTH = 16;
    export class STMSerialState {
        serialIn: string[] = [];

        constructor(private readonly runtime: Runtime, private readonly board: BaseBoard) {
            this.board.addMessageListener(this.handleMessage.bind(this))
        }

        private handleMessage(msg: SimulatorMessage) {
            if (msg.type === "serial") {
                const data = (<SimulatorSerialMessage>msg).data || "";
                this.receiveData(data);
            }
        }

        public receiveData(data: string) {
            this.serialIn.push();
        }

        readSerial() {
            let v = this.serialIn.shift() || "";
            return v;
        }

        serialOutBuffer: string = "";
        writeSerial(s: string) {
            this.serialOutBuffer += s;
            if (/\n/.test(this.serialOutBuffer) || this.serialOutBuffer.length > SERIAL_BUFFER_LENGTH) {
                Runtime.postMessage(<SimulatorSerialMessage>{
                    type: 'serial',
                    data: this.serialOutBuffer,
                    id: runtime.id,
                    sim: true
                })
                this.serialOutBuffer = '';
            }
        }
    }
}