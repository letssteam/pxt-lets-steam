/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
namespace pxsim {
    export interface CompassBoard extends CommonBoard {
        compassState: CompassState;
        invertCompassXAxis?: boolean;
        invertCompassYAxis?: boolean;
        invertCompassZAxis?: boolean;
    }
    
    export function compass(): CompassState {
        return (board() as CompassBoard).compassState;
    }
}