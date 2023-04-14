/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim.input {

    export function getECValue(pin: pxsim.pins.DigitalInOutPin) : number{
        let state = sen0244State();
        return state.value;
    }
}