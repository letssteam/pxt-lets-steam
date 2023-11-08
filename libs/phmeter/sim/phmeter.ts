/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim.input {
  export function getPhmeterPh(pin: pxsim.pins.AnalogInOutPin): number {
    let state = phmeterState();
    let value = 0;
    const existingOffset = state.offset_tab.find(([id]) => id === pin.id);
    if (existingOffset) {
      value += existingOffset[1];
    }
    return state.ph + value;
  }

  export function calibratePhmeter(
    pin: pxsim.pins.AnalogInOutPin,
    offset: number
  ) {
    let state = phmeterState();
    const existingOffset = state.offset_tab.find(([id]) => id === pin.id);
    if (existingOffset) {
      existingOffset[1] = offset;
    } else {
      state.offset_tab.push([pin.id, offset]);
    }
  }
}
