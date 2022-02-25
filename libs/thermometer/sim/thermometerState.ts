namespace pxsim{
    export class ThermometerState { 
        constructor(public thermometerState: AnalogSensorState, public thermometerUnitState: number = pxsim.TemperatureUnit.Celsius) {
            
        }        
    }

    export function setTemperatureUnit(unit: TemperatureUnit) {
        (board() as TemperatureBoard).thermometerUnitState = unit;
    }

    export function temperatureUnit() : TemperatureUnit{
        return (board() as TemperatureBoard).thermometerUnitState;
    }
}