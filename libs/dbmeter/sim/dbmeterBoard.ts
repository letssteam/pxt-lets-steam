/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim {
    export interface DBMeterBoard extends CommonBoard {
        dbMeterState: AnalogSensorState;
    }
}