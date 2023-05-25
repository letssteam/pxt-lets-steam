/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim {
  export class AnemometerState {
    private rps: number;
    private used: boolean = false;

    constructor() {
      this.rps = 0;
    }

    public getRPS() {
      return this.rps;
    }

    public setRPS(rps: number) {
      this.rps = rps;
    }

    public addRPS() {
      this.rps += 1;
    }

    public setUsed() {
      if (!this.used) {
        this.used = true;
        runtime.queueDisplayUpdate();
      }
    }

    public isUsed() {
      return this.used;
    }
  }

  export function anemometerState(): AnemometerState {
    return (board() as AnemometerBoard).anemometerState;
  }
}
