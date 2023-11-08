namespace pxsim {
  export class PhmeterState {
    ph: number;
    offset_tab: [number, number][] = [];
  }

  export interface PhmeterBoard extends CommonBoard {
    phmeterState: PhmeterState;
  }

  export function phmeterState(): PhmeterState {
    return (board() as PhmeterBoard).phmeterState;
  }
}
