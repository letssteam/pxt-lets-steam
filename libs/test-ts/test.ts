//% weight=2 color=#002050
//% advanced=true blockGap=8
namespace test {

    /**
    * Set the pin High for amount of time
    */
    //% blockId=test_high_time block="high for %nb ms"
    //% weight=18
    export function highForMs(ms: number): void {
        const t = getTest();
        t.setHigh();
        loops.pause(ms);
    }


    /**
    * Set the pin High for amount of time
    */
    //% blockId=test_low_time block="low for %nb ms"
    //% weight=18
    export function lowForMs(ms: number): void {
        const t = getTest();
        t.setLow();
        loops.pause(ms);
    }
}
