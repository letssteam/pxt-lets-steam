/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim.input {
  enum AnemometerUnit {
    RPM,
    RPS,
  }

  export async function getAnemometerRotation(
    pin: pxsim.Pin,
    timeSpan: number
  ): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      let state = anemometerState();
      await new Promise((resolve) => setTimeout(resolve, timeSpan * 1000));
      resolve(state.getRPS());
    });
  }

  export async function getAnemometerRotationPerUnit(
    pin: pxsim.Pin,
    unit: AnemometerUnit,
    timeSpan: number
  ): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      let result: number = await getAnemometerRotation(pin, timeSpan).then(
        (value) => {
          return value;
        }
      );
      resolve(unit == AnemometerUnit.RPM ? result * 60 : result);
    });
  }
}
