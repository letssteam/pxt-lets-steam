namespace pxsim{
    export class BarometerState { 
        constructor(public barometerState: AnalogSensorState, public pressureUnit : PressureUnit) {
            
        }
    }

    export function barometerState(): AnalogSensorState {
        return (board() as BarometerBoard).barometerState;
    }

    export function setPressureUnit(unit: PressureUnit) {
        (board() as BarometerBoard).pressureUnitState = unit;
    }
}