/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {
    const xc = 275;
    const yc = 255;

    export class CompassView implements IBoardPart<CompassState> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        
        public style = BUTTON_PAIR_STYLE;
        private state: CompassState;
        private bus: EventBus;

        private logos: SVGElement[];
        private head: SVGGElement;
        private headInitialized = false;
        private headText: SVGTextElement;


        public init(bus: EventBus, state: CompassState, svgEl: SVGSVGElement, otherParams: Map<string>) {
            this.state = state;
            this.bus = bus;
            this.defs = [];
            this.svgEl = svgEl;
            this.updateState();
            this.attachEvents();
        }

        public moveToCoord(xy: Coord) {
            let btnWidth = PIN_DIST * 3;
            let [x, y] = xy;
            translateEl(this.element, [x, y])
        }

        public updateState() {
            let state = this.state;
            if (!state || !state.heading || !state.usesHeading) {
                if (this.head) {
                    this.svgEl.removeChild(this.element);
                    this.head = null;
                    this.headInitialized = false;
                }
            } else if (state && state.heading && state.usesHeading && !this.headInitialized) {
                this.mkCompass();
                this.svgEl.appendChild(this.element);
                this.updateCompass();
                this.headInitialized = true;
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {
        }

        private mkCompass() {
            let svgEl = this.svgEl;
            let g = <SVGGElement>svg.elt("g");
            this.head = <SVGGElement>svg.child(g, "g", { class: "sim-head no-drag" });
            svg.child(this.head, "circle", { cx: xc, cy: yc, r: 40, fill: "#303030" })
            
            let compass = <SVGGElement>svg.child(this.head, "g");
            compass.setAttribute("transform","translate("+(xc-46)+","+(yc-46)+") scale(0.090612541, 0.090538705)");
            //svg.path(compass, "sim-theme", "M 500.1,990.4 C 225.2,986.5 9.9,774.4 10,499.4 10.1,224.7 225,9.6 499.9,9.6 775.1,9.5 990.7,225.3 990,500.9 989.3,774.6 774.9,986.4 500.1,990.4 Z M 500.2,63.2 C 260,62.9 64,258 63.6,497.8 63.2,739.8 257.7,935.4 499.5,935.9 739.6,936.4 936,741.2 936.4,501.5 936.8,259.2 742,63.5 500.2,63.2 Z");
            svg.path(compass, "sim-theme", "m 706.2,141.1 c -3.1,17.1 -6,32.6 -8.8,48 -14.8,79.7 -29.5,159.5 -44.3,239.2 -8.7,46.7 -17.3,93.5 -26.1,140.2 -0.4,2.2 -1.9,4.7 -3.6,6.2 -80.8,69.1 -161.6,138.1 -242.4,207.1 -27.7,23.7 -55.5,47.3 -83.2,70.9 -1.2,1 -2.5,1.9 -4.8,3.8 1.9,-10.3 3.4,-19.3 5.1,-28.3 24.6,-132.9 49.2,-265.8 74,-398.6 0.5,-2.5 2.3,-5.3 4.3,-7 62.5,-53.5 125.2,-106.9 187.8,-160.4 46.1,-39.3 92.1,-78.7 138.2,-118 0.7,-0.6 1.6,-1.3 3.8,-3.1 z M 341.9,770.7 c 0.4,0.2 0.7,0.5 1.1,0.7 84.6,-71.9 169.2,-143.8 254.2,-216 C 532.1,517.8 467.7,480.6 402.8,443.2 382.4,552.9 362.2,661.8 341.9,770.7 Z");
            
            this.headText = <SVGTextElement>svg.child(g, "text", { x: xc-15, y: yc+65, class: "sim-text" })

            this.updateTheme();
            let pt = this.svgEl.createSVGPoint();


            svg.buttonEvents(
                this.head,
                (ev: MouseEvent) => {
                    let state = this.state;
                    let cur = svg.cursorPoint(pt, this.svgEl, ev);
                    state.heading = Math.floor(Math.atan2(cur.y - yc, cur.x - xc) * 180 / Math.PI + 90);
                    if (state.heading < 0) state.heading += 360;
                    this.updateCompass();
                });
            this.element = g;
        }

        private attachEvents() {
        }

        private updateCompass() {
            let state = this.state;
            if (!state || !state.usesHeading) return;

            let txt = state.heading.toString() + "°";
            if (txt != this.headText.textContent) {
                svg.rotateElement(this.head, xc, yc, state.heading - 120);
                this.headText.textContent = txt;
            }
        }
    }
}