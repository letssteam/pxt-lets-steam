namespace pxsim{
    
    export class ECMeterSEN0244State {
        value: number;
    }

    export interface ECMeterSEN0244Board extends CommonBoard {
        sen0422State: ECMeterSEN0244State;
    }

    export function sen0244State(): ECMeterSEN0244State{
        return(board() as ECMeterSEN0244Board).sen0422State;
    }
}