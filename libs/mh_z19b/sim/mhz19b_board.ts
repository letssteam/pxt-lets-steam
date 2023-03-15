namespace pxsim{
    
    export class MHZ19BState {
        value: number;
    }

    export interface MHZ19BBoard extends CommonBoard {
        mhz19bState: MHZ19BState;
    }

    export function mhz19BState(): MHZ19BState{
        return(board() as MHZ19BBoard).mhz19bState;
    }
}