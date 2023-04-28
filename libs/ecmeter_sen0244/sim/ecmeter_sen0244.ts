/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim {
    export enum ECUnit {
        //% block="S/cm"
        S_CM = 0,
        //% block="mS/cm"
        MS_CM = 1,
        //% block="µS/cm"
        US_CM = 2,
    }
}

namespace pxsim.input {

    export function getECValue(pin: pxsim.pins.DigitalInOutPin, unit: pxsim.ECUnit) : number{
        let state = sen0244State();

        switch(unit){
            case ECUnit.US_CM:
                return state.value * 1000000;

            case ECUnit.MS_CM:
                return state.value * 1000;

            case ECUnit.S_CM:
            default:
                return state.value;
        }
    }
}