namespace pxsim{
    export interface LCDI2CBoard extends CommonBoard {
        lcdI2CState: LCDState;
    }

    export function lcdI2CState(): LCDState{
        return(board() as LCDI2CBoard).lcdI2CState;
    }
}