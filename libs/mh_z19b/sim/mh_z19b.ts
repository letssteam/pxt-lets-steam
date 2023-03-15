/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim.input {

    export function getCO2Concentration(pin: pxsim.pins.DigitalInOutPin) : number{
        let state = mhz19BState();
        return state.value;
    }
}