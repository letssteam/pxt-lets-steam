namespace pxsim{
    
    export class SoilHygrometerState {
        value: number;
    }

    export interface SoilHygrometerBoard extends CommonBoard {
        soilHygrometerState: SoilHygrometerState;
    }

    export function soilHygrometerState(): SoilHygrometerState{
        return(board() as SoilHygrometerBoard).soilHygrometerState;
    }
}