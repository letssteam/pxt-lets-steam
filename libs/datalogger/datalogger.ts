/**
 * A tiny data logging framework
 */
//% weight=80 color=#00a0a0 icon="" blockGap=8
//% groups='["Data", "Configuration"]'
namespace datalogger {

    let separator = ',';
    let _headers: string[] = undefined;
    let _headersWritten: boolean = false;
    let _row: number[] = undefined;
    let _samples: number[] = undefined;
    let _start: number;
    let _enabled = true;
    let _samplingInterval = -1;
    let _lastSampleTime = -1;
    let _console = false;

    function clear() {
        _headers = undefined;
        _row = undefined;
    }

    function sendHeaders(){
        const line = _headers.join(separator);
        Serial.writeLine(`sep=${separator}`);
        Serial.writeLine(line);
    }

    function sendRow(){
        const line = _row.join(separator);
        Serial.writeLine(line);
    }

    function initRow() {
        if (_row) return;

        if (!_headers) {
            _headers = [];
            _headersWritten = false;
            _start = control.millis();
        }
        _row = [];
        _samples = [];
        _lastSampleTime = control.millis();
        const s = (_lastSampleTime - _start) / 1000;
        addValue("time", s);
    }

    function commitRow() {
        // write row if any data
        if (_row && _row.length > 0) {
            
            // write headers for the first row
            if (!_headersWritten) {
                sendHeaders();
                if (_console){
                    console.log(_headers.slice(1).join(separator));
                }
                _headersWritten = true;
            }

            // commit row data
            if (_samplingInterval <= 0 || control.millis() - _lastSampleTime >= _samplingInterval) {

                // average data
                for(let i = 1; i < _row.length; ++i) {
                    _row[i] /= _samples[i];
                }

                // append row
                sendRow();

                if (_console) {
                    // drop time
                    console.log(_row.slice(1).join(separator));
                }

                // clear values
                _row = undefined;
                _lastSampleTime = -1;
            }
        }
    }

    /**
     * Start a new row of data
     */
    //% group="Data"
    //% weight=100
    //% blockId=datalogAddRow block="data logger add row"
    //% help=datalogger/add-row
    export function addRow(): void {
        if (!_enabled) return;

        commitRow();
        initRow();
    }

    /**
     * Add a named value to the row of data
     * @param name name of the cell, eg: "x"
     * @param value value of the cell, eg: 0
     */
    //% group="Data"
    //% weight=99
    //% blockId=datalogAddValue block="data logger add %name|=%value"
    //% blockGap=12
    //% help=datalogger/add-value
    export function addValue(name: string, value: number) {
        if (!_row) return;

        let idx = -1;

        // happy path
        if (_headers[_row.length] === name)
            idx = _row.length;
        else {
            idx = _headers.indexOf(name);
            if (idx < 0) {
                _headers.push(name);
                idx = _headers.length - 1;
            }
        }

        if( _row[idx] == undefined ){
            _row[idx] = value;
            _samples[idx] = 1;
        }
        else{
            _row[idx] += value;
            _samples[idx] += 1;
        }
    }

    /**
     * Commits any buffered row to disk
     */
    //%
    export function flush() {
    }

    /**
     * Set the minimum number of milliseconds between rows
     * @param millis milliseconds between each sample, eg: 50
     */
    //% group="Configuration"
    //% blockId=datalogSetSamplingInterval block="set data logger sampling interval to $millis|(ms)"
    //% millis.shadow=timePicker
    //% help=datalogger/set-sample-interval
    export function setSampleInterval(millis: number) {
        _samplingInterval = millis >> 0;
    }

    /**
     * Turn on or off datalogging
     * @param enabled 
     */
    //% group="Configuration"
    //% blockId=datalogEnabled block="data logger $enabled"
    //% enabled.shadow=toggleOnOff
    //% help=datalogger/set-enabled
    export function setEnabled(enabled: boolean) {
        flush();
        _enabled = enabled;
    }

    /**
     * Send the data logger output to the console
     * @param enabled 
     */
    //% group="Configuration"
    //% blockId="datalogConsole" block="data logger to console $enabled"
    //% enabled.shadow=toggleOnOff
    //% help=datalogger/send-to-console
    export function sendToConsole(enabled: boolean) {
        _console = enabled;
    }
}
