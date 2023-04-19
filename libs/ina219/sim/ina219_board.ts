namespace pxsim{
    
    export class INA219State {
        current: number;
        voltage: number;
    }

    export interface INA219Board extends CommonBoard {
        ina219State: INA219State;
    }

    export function ina219State(): INA219State{
        return(board() as INA219Board).ina219State;
    }
}