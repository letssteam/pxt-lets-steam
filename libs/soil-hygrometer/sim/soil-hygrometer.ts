/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim.input {

    export function getSoilHumidity(pin: pxsim.pins.AnalogInOutPin) : number{
        let state = soilHygrometerState();
        return state.value;
    }
}