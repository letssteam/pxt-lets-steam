namespace pxsim {
    export interface HygrometerBoard extends CommonBoard {
        hygrometerState: AnalogSensorState;
    }

    export function hygrometerState(): AnalogSensorState {
        return (board() as HygrometerBoard).hygrometerState;
    }
}