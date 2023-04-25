/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim{
    export class HCSR04State { 
        private distance : number;
        private time : number;
        private used : boolean = false;
        public distanceActionEvent : number[];
        public distanceEvent: RefAction[];
        public lastEvent : number;

        constructor() {
            this.setDistance(40);
            this.setTime();
            this.distanceEvent = [null, null];
            this.distanceActionEvent = [null, null];
            this.lastEvent = null;
        }

        public registerDistanceEvent(fromDistanceIs: number, distance: number, handler: RefAction) {
            this.distanceEvent[fromDistanceIs] = handler;
            this.distanceActionEvent[fromDistanceIs] = distance;
        }
    
        public getDistance(unit : number): number {
            switch(unit) {
                case 0:
                    return this.distance / 1000
                case 1:
                    return this.distance / 100;
                case 2:
                    return this.distance / 10;
                case 3:
                default:
                    return this.distance;
            }
        }
    
        public getTime(unit: number): number {
            switch (unit) {
                case 0:
                    return this.time / 1000000;
                case 1:
                    return this.time / 1000;    
                case 2:
                default:
                    return this.time;
            }
        }

        public setTime() {
            this.time = (1000000 * 2 * this.distance) / 343000;
        }

        public setDistance(distance: number) {
            this.distance = distance;
        }

        public setUsed() {
            if (!this.used) {
                this.used = true;
                runtime.queueDisplayUpdate();
            }
        }

        public isUsed() : boolean {
            return this.used;
        }
    }

    export function hcsr04State(): HCSR04State {
        return (board() as hcsr04Board).hcsr04State;
    }
}