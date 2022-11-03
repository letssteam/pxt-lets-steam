/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim{
    export class HCSR04State { 
        private distance;
        private used : boolean = false;
        public distanceActionEvent : number[];
        public distanceEvent: RefAction[];
        public lastEvent : number;

        constructor() {
            this.distance = 40;
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
                case 1:
                    return this.distance / 10;
    
                case 2:
                    return this.distance / 100;
    
                case 3:
                    return this.distance / 1000;
                
                case 0: 
                default:
                    return this.distance;
            }
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