/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../node_modules/typescript/lib/lib.dom.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {

    export function mkSSD1306Part(xy: Coord = [0, 0]) : SVGElAndSize {
        let [x, y] = xy;
        let l = x;
        let t = y;
        let w = SSD1306_PART_WIDTH;
        let h = SSD1306_PART_HEIGHT;
        let img = <SVGGElement>svg.elt("image");

        console.log("Mk SSD !");

        svg.hydrate(img, {
            class: "sim-ssd1306", x: l, y: t, width: w, height: h,
            href: svg.toDataUri(SSD1306_PART)
        });
        return { el: img, x: l, y: t, w: w, h: h };
    }

    export class SSD1306View implements IBoardPart<SSD1306State> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;


        private screen: SVGElement;

        private state: SSD1306State;
        private bus: EventBus;
        // private btn: SVGGElement;

        // private distanceGradient: SVGLinearGradientElement;
        // private distance: SVGRectElement;
        // private distanceText: SVGTextElement;

        // private static dmin = 0;
        // private static dmax = 2000;

        constructor(){
        }

        public init(bus: EventBus, state: SSD1306State, svgEl: SVGSVGElement, otherParams: Map<string>) {
            
            alert("merde !");
            console.log("Init ssd !");
            
            this.state = state;
            this.bus = bus;
            this.defs = [];
            this.svgEl = svgEl;
            this.initDom();
            this.updateState();
            this.attachEvents();
        }

        public moveToCoord(xy: Coord) {
            translateEl(this.element, [xy[0], xy[1]]);
        }

        public updateState() {
            // let state = this.state;
            // if (!state || !state.sensorUsed) {
            //      if (this.element) {
            //         this.svgEl.removeChild(this.element);
            //         this.element = null;
            //     }
            // } else if (state && state.sensorUsed) {
            //     // this.mkDistance();
            //     // this.svgEl.appendChild(this.element);
            //     // this.updateDistance();
            // }
        }

        public updateTheme() {
        }

        initDom() {
            this.element = svg.elt("g");
            this.svgEl = new DOMParser().parseFromString(SSD1306_PART, "image/svg+xml").querySelector("svg") as SVGSVGElement;
            svg.hydrate( this.svgEl, {
                class: "sim-ssd1306",
                width: SSD1306_PART_WIDTH,
                height: SSD1306_PART_HEIGHT
            });
            this.screen = this.svgEl.getElementById("print_zone") as SVGElement;
            //this.svgEl.appendChild(this.element);
            this.element.appendChild(this.svgEl);

            console.log("polp");
        }

        private mkDistance() {
            // let svgEl = this.svgEl;
            // let defs = <SVGDefsElement>svg.child(svgEl, "defs", {});
            // let g = <SVGGElement>svg.elt("g");

            // if (!this.distance) {
            //     let gid = "gradient-distance";
            //     this.distanceGradient = svg.linearGradient(defs, gid);
            //     let xBase = 25;
            //     let yBase = 450;
            //     let heightBase = 64;
            //     svg.child(g, "rect", {
            //         fill: "transparent",
            //         x: xBase -5,
            //         y: yBase-20,
            //         width: 20,
            //         height: heightBase+40,
            //     });
            //     this.distance = <SVGRectElement>svg.child(g, "rect", {
            //         class: "sim-distance no-drag",
            //         x: xBase,
            //         y: yBase,
            //         width: 10,
            //         height: heightBase,
            //         rx: 4, ry: 4,
            //         fill: `url(#${gid})`
            //     });
            //     this.distanceText = svg.child(g, "text", { class: 'sim-text', x: xBase + 20, y: yBase + 20 }) as SVGTextElement;
            //     this.updateTheme();

            //     let pt = svgEl.createSVGPoint();
            //     svg.buttonEvents(this.distance,
            //         // move
            //         (ev) => {
            //             let cur = svg.cursorPoint(pt, svgEl, ev);
            //             let t = Math.max(0, Math.min(1, ((heightBase + yBase) - cur.y)/(heightBase)));
            //             console.log(64 + yBase - cur.y);
            //             this.state.distanceState.setLevel(Math.floor(DistanceView.dmin + t * (DistanceView.dmax - DistanceView.dmin)));
            //             this.updateDistance();
            //         },
            //         // start
            //         ev => { },
            //         // stop
            //         ev => { },
            //         // keydown
            //         (ev) => {
            //             let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
            //             if (charCode === 40 || charCode === 37) { // Down/Left arrow
            //                 if (this.state.distanceState.getLevel() === DistanceView.dmin) {
            //                     this.state.distanceState.setLevel(DistanceView.dmax);
            //                 } else {
            //                     this.state.distanceState.setLevel(this.state.distanceState.getLevel() - 1);
            //                 }
            //                 this.updateDistance();
            //             } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
            //                 if (this.state.distanceState.getLevel() === DistanceView.dmax) {
            //                     this.state.distanceState.setLevel(DistanceView.dmin);
            //                 } else {
            //                     this.state.distanceState.setLevel(this.state.distanceState.getLevel() + 1);
            //                 }
            //                 this.updateDistance();
            //             }
            //         });

            //     accessibility.makeFocusable(this.distance);
            //     accessibility.setAria(this.distance, "slider", "Distance");
            //     this.distance.setAttribute("aria-valuemin", DistanceView.dmin.toString());
            //     this.distance.setAttribute("aria-valuemax", DistanceView.dmax.toString());
            //     this.distance.setAttribute("aria-orientation", "vertical");
            // }
            // this.element = g;
        }

        private attachEvents() {
        }

        private updateDistance() {
            // let state = this.state;
            // if (!state || !state.distanceState || !state.distanceState.sensorUsed)
            //     return;
            
            // let t = Math.max(DistanceView.dmin, Math.min(DistanceView.dmax, state.distanceState.getLevel()))
            // let per = Math.floor((state.distanceState.getLevel() - DistanceView.dmin) / (DistanceView.dmax - DistanceView.dmin) * 100)
            // svg.setGradientValue(this.distanceGradient, 100 - per + "%");

            // let unit = " mm";
            // if (state.distanceUnit == pxsim.DistanceUnit.Meter) {
            //     unit = " m";
            // }
            // this.distanceText.textContent = t + unit;
            // this.distance.setAttribute("aria-valuenow", t.toString());
            // this.distance.setAttribute("aria-valuetext", t + unit);
            // accessibility.setLiveContent(t + unit);
        }
    }

        const SSD1306_PART_WIDTH = 490.47632;
        const SSD1306_PART_HEIGHT = 208.97415;
    
        const SSD1306_PART = `<?xml version="1.0" encoding="utf-8"?>
        <!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="82px" height="82px" viewBox="0 0 82 82" enable-background="new 0 0 82 82" xml:space="preserve">
        <g>
            <path fill="#006699" d="M77.363,0.153H3.946c-1.66,0-4.006,2.571-4.006,5.745v70.205c0,3.171,2.346,5.743,4.006,5.743H78.05
                c1.66,0,4.009-2.572,4.009-5.743V5.897C82.059,2.724,79.023,0.153,77.363,0.153z M13.052,80.501v0.006h-0.047
                c-0.094,0.006-0.183,0.026-0.276,0.026c-0.112,0-0.22-0.021-0.328-0.026H8.052c-0.108,0.008-0.215,0.026-0.327,0.026
                c-2.313,0-4.188-1.875-4.188-4.188c0-2.312,1.875-4.188,4.188-4.188h5.327v0.033c2.158,0.168,3.863,1.953,3.863,4.154
                C16.915,78.548,15.212,80.333,13.052,80.501z M13.677,10.626v0.005H13.63c-0.094,0.006-0.183,0.028-0.276,0.028
                c-0.112,0-0.22-0.019-0.328-0.028H8.677c-0.108,0.009-0.215,0.028-0.327,0.028c-2.313,0-4.188-1.875-4.188-4.188
                S6.036,2.283,8.35,2.283h5.327v0.033c2.158,0.168,3.863,1.953,3.863,4.155C17.54,8.673,15.837,10.458,13.677,10.626z
                 M74.177,80.251v0.006H74.13c-0.094,0.006-0.183,0.026-0.276,0.026c-0.112,0-0.22-0.021-0.328-0.026h-4.349
                c-0.108,0.008-0.215,0.026-0.327,0.026c-2.313,0-4.188-1.875-4.188-4.188c0-2.312,1.875-4.188,4.188-4.188h5.327v0.033
                c2.158,0.168,3.863,1.953,3.863,4.154C78.04,78.298,76.337,80.083,74.177,80.251z M75.177,11v0.006H75.13
                c-0.094,0.006-0.183,0.027-0.276,0.027c-0.112,0-0.22-0.02-0.328-0.027h-4.349c-0.108,0.008-0.215,0.027-0.327,0.027
                c-2.313,0-4.188-1.875-4.188-4.188s1.875-4.188,4.188-4.188h5.327V2.69c2.158,0.168,3.863,1.953,3.863,4.155
                C79.04,9.047,77.337,10.833,75.177,11z"/>
            <rect x="28.021" y="1.473" fill="#454545" width="3.713" height="7.427"/>
            <polygon fill="#454545" points="26.163,3.328 28.021,1.473 28.021,8.899 26.163,7.041 	"/>
            <polygon fill="#454545" points="31.732,1.473 33.593,3.328 33.593,7.041 31.732,8.899 	"/>
            <rect x="29.223" y="4.349" fill="#B68B2D" width="1.312" height="1.668"/>
            <rect x="35.223" y="1.473" fill="#454545" width="3.713" height="7.427"/>
            <polygon fill="#454545" points="33.363,3.328 35.223,1.473 35.223,8.899 33.363,7.041 	"/>
            <polygon fill="#454545" points="38.934,1.473 40.792,3.328 40.792,7.041 38.934,8.899 	"/>
            <rect x="36.421" y="4.349" fill="#B68B2D" width="1.312" height="1.668"/>
            <rect x="42.421" y="1.473" fill="#454545" width="3.713" height="7.427"/>
            <polygon fill="#454545" points="40.564,3.328 42.421,1.473 42.421,8.899 40.564,7.041 	"/>
            <polygon fill="#454545" points="46.134,1.473 47.992,3.328 47.992,7.041 46.134,8.899 	"/>
            <rect x="43.622" y="4.349" fill="#B68B2D" width="1.312" height="1.668"/>
            <rect x="49.622" y="1.473" fill="#454545" width="3.713" height="7.427"/>
            <polygon fill="#454545" points="47.764,3.328 49.622,1.473 49.622,8.899 47.764,7.041 	"/>
            <polygon fill="#454545" points="53.333,1.473 55.191,3.328 55.191,7.041 53.333,8.899 	"/>
            <rect x="50.82" y="4.349" fill="#B68B2D" width="1.312" height="1.668"/>
            <text transform="matrix(1 0 0 1 27.165 12.1396)" fill="#FFFFFF" font-family="'OCRA'" font-size="2.5">VCC</text>
            <text transform="matrix(1 0 0 1 34.4883 12.1377)" fill="#FFFFFF" font-family="'OCRA'" font-size="2.5">GND</text>
            <text transform="matrix(1 0 0 1 41.8115 12.1396)" fill="#FFFFFF" font-family="'OCRA'" font-size="2.5">SCL</text>
            <text transform="matrix(1 0 0 1 49.1348 12.1377)" fill="#FFFFFF" font-family="'OCRA'" font-size="2.5">SDA</text>
            <rect x="1.238" y="12.726" fill="#231F20" width="79.125" height="46"/>
            <rect id="print_zone" x="3.113" y="14.101" fill="#00435E" width="76.125" height="43.5"/>
            <rect x="25.988" y="57.726" fill="#231F20" width="30" height="23.375"/>
            <text transform="matrix(1 0 0 1 30.7334 64.6006)" fill="#FFFFFF" font-family="'OCRA'" font-size="2.5">OLED 128x64 </text>
            <text transform="matrix(1 0 0 1 34.3076 67.6006)" fill="#FFFFFF" font-family="'OCRA'" font-size="2.5">SSD1306 </text>
            <text transform="matrix(1 0 0 1 37.8823 70.6006)" fill="#FFFFFF" font-family="'OCRA'" font-size="2.5">I2C</text>
            <text transform="matrix(1 0 0 1 29.2227 77.0986)" fill="#FFFFFF" font-family="'OCRA'" font-size="2.5">blog.squix.ch</text>
        </g>
        </svg>`;
}