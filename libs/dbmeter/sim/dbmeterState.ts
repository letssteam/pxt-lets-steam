/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxsim{
    export class DBMeterState { 
        constructor(public dbMeterState: AnalogSensorState) {
            
        }
    }

    export function dbMeterState(): AnalogSensorState {
        return (board() as DBMeterBoard).dbMeterState;
    }
}