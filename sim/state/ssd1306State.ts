/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>

namespace pxsim {
    export class SSD1306State {
        matrix: boolean[][];

        public sensorUsed: boolean = false;

        constructor() {
            this.matrix = []

            for( var x = 0; x < 128; x++ ){
                this.matrix[x] = [];
                for( var y = 0; y < 64; ++y ){
                    this.matrix[x][y] = false;
                }
            }
        }

        public setUsed(){
            if( !this.sensorUsed ){
                this.sensorUsed = true;
                runtime.queueDisplayUpdate();
            }
        }
    }

    export function ssd1306State(): SSD1306State {
        return (board() as SSD1306Board).ssd1306State;
    }
}