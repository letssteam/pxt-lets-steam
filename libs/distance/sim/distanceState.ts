/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxsim{
    export class DistanceState { 
        constructor(public distanceState: AnalogSensorState, public distanceUnit : DistanceUnit) {
            
        }
    }

    export function distanceState(): AnalogSensorState {
        return (board() as DistanceBoard).distanceState;
    }

    export function distanceUnit(): DistanceUnit {
        return (board() as DistanceBoard).distanceUnitState;
    }

    export function setDistanceUnit(unit: DistanceUnit) {
        (board() as DistanceBoard).distanceUnitState = unit;
    }
}