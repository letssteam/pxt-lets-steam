/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim {
    export interface BarometerBoard extends CommonBoard {
        barometerState: AnalogSensorState;
        pressureUnitState: PressureUnit;
    }
}