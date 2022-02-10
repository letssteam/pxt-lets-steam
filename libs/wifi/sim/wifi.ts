/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim.wifi {
  const DEVICE_ID_WIFI_ISM43362_DATA_READY = 2510;
  const WIFI_ISM43362_EVT_DATA_READY = 1;

  export function onReceivedData(handler: RefAction): void {
    pxtcore.registerWithDal(
      DEVICE_ID_WIFI_ISM43362_DATA_READY,
      WIFI_ISM43362_EVT_DATA_READY,
      handler
    );
  }

  export function executeHttpMethod(
    method: number,
    host: string,
    port: number,
    urlPath: string,
    headers: string,
    body: string,
    time: number
  ): void {}
}
