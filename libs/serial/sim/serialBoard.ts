namespace pxsim {
    export interface SerialBoard extends CommonBoard {
        serialState: STMSerialState;
    }

    export function serialState(): STMSerialState {
        return (board() as SerialBoard).serialState;
    }
}