namespace pxsim {
  export class AnemometerState {
    value: number;
  }

  export interface AnemometerBoard extends CommonBoard {
    anemometerState: AnemometerState;
  }

  export function anemometerState(): AnemometerState {
    return (board() as AnemometerBoard).anemometerState;
  }
}
