/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>

namespace pxsim {

    export class SSD1306DrawElement {
        svgObject: SVGGraphicsElement;
        x : number;
        y : number;
        width : number;
        height : number;
    }

    export class SSD1306State {
        drawingList: SSD1306DrawElement[];
        isInvert : boolean = false;

        constructor() {
            this.drawingList = []
        }

        public getWidth() : number { return 128; }
        public getHeight() : number { return 64; }
    }

    export function ssd1306State(): SSD1306State {
        return (board() as SSD1306Board).ssd1306State;
    }
}