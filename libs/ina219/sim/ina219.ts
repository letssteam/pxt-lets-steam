/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim.input {

    export function getINA219Voltage() : number {
        let state = ina219State();
        return Math.round( state.voltage * 100 ) / 100;
    }

    export function getINA219Current() : number {
        let state = ina219State();
        return Math.round( state.current * 100 ) / 100;
    }

    export function getINA219Power() : number {
        let state = ina219State();
        return state.current * state.voltage;
    }
}