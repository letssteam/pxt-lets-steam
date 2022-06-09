/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
namespace pxsim.lcd_i2c {
    export function initScreen(){
        let state = lcdI2CState();
        state.setUsed();

        clear();
        BacklightOn();
    }
    
    export function initScreenAddress(address: string){
        initScreen();
    }

    export function setCursor(x: number, y: number) {
        let state = lcdI2CState();
        
        if (y < state.lines && y >= 0)
            state.cursorPos[0] = y;
        if (x < state.columns && x >= 0)
            state.cursorPos[1] = x;
        else if (x >= state.columns)
            state.cursorPos[1] = state.columns;

        state.setUsed();
    }

    export function ShowNumber(n: number) {
        ShowString("" + n);
    }

    export function ShowValue(name: string, value: number) {
        ShowString( name + ":" + value);
    }

    export function ShowString(s: string) {
        let state = lcdI2CState();
        state.setUsed();

        if (state.cursorPos[0] >= state.lines || state.cursorPos[0] < 0)
            return;
            
        if (state.cursorPos[1] >= state.columns || state.cursorPos[1] < 0)
            return;

        state.text[state.cursorPos[0]] = state.text[state.cursorPos[0]].substring(0, state.cursorPos[1]) + s + state.text[state.cursorPos[0]].substring(state.cursorPos[1] + s.length, state.columns);
        state.cursorPos[1] += s.length;
        runtime.queueDisplayUpdate()
    }

    export function clear() {
        let state = lcdI2CState();
        state.clear();
        state.setUsed();
    }

    export function BacklightOn() {
        let state = lcdI2CState();
        state.backLightColor = "#A0F7F7";
        state.setUsed();

    }

    export function BacklightOff() {
        let state = lcdI2CState();
        state.backLightColor = "#6e7d6e";
        state.setUsed();
    }

    export function ShowNumberAtPos(n: number, x: number, y: number) {
        setCursor(x, y);
        ShowNumber(n);
        runtime.queueDisplayUpdate()
    }

    export function ShowStringAtPos(s: string, x: number, y: number) {
        setCursor(x, y);
        ShowString(s);
        runtime.queueDisplayUpdate()

    }

    // function RGBColorToHtmlColor(rgb: number): string {
    //     let red = unpackR(rgb);
    //     let green = unpackG(rgb);
    //     let blue = unpackB(rgb);
    //     let html = "#" +
    //         (red > 10 ? red.toString(16) : "0" + red.toString(16)) +
    //         (green > 10 ? green.toString(16) : "0" + green.toString(16)) +
    //         (blue > 10 ? blue.toString(16) : "0" + blue.toString(16));
    //     return html;
    // }

    // function unpackR(rgb: number): number {
    //     let r = (rgb >> 16) & 0xFF;
    //     return r;
    // }
    // function unpackG(rgb: number): number {
    //     let g = (rgb >> 8) & 0xFF;
    //     return g;
    // }
    // function unpackB(rgb: number): number {
    //     let b = (rgb >> 0) & 0xFF;
    //     return b;
    // }

}