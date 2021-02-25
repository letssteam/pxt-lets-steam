/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {
    export class DistanceView implements IBoardPart<DistanceState> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;
        private state: DistanceState;
        private bus: EventBus;
        private btn: SVGGElement;

        private distanceGradient: SVGLinearGradientElement;
        private distance: SVGRectElement;
        private distanceText: SVGTextElement;

        private static dmin = 0;
        private static dmax = 2000;

        public init(bus: EventBus, state: DistanceState, svgEl: SVGSVGElement, otherParams: Map<string>) {
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
            translateEl(this.btn, [x, y])
        }

        public updateState() {
            let state = this.state;
            if (!state || !state.distanceState || !state.distanceState.sensorUsed) {
                if (this.distance) {
                    this.svgEl.removeChild(this.element);
                    this.distance = null;
                }
            } else if (state && state.distanceState && state.distanceState.sensorUsed) {
                this.mkDistance();
                this.svgEl.appendChild(this.element);
                this.updateDistance();
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {
            let On = "#77ffff";
            let Off = "#fff";
            svg.setGradientColors(this.distanceGradient, Off, On);
        }

        private mkDistance() {
            let svgEl = this.svgEl;
            let defs = <SVGDefsElement>svg.child(svgEl, "defs", {});
            let g = <SVGGElement>svg.elt("g");

            if (!this.distance) {
                let gid = "gradient-distance";
                this.distanceGradient = svg.linearGradient(defs, gid);
                let xBase = 25;
                let yBase = 450;
                let heightBase = 64;
                svg.child(g, "rect", {
                    fill: "transparent",
                    x: xBase -5,
                    y: yBase-20,
                    width: 20,
                    height: heightBase+40,
                });
                this.distance = <SVGRectElement>svg.child(g, "rect", {
                    class: "sim-distance no-drag",
                    x: xBase,
                    y: yBase,
                    width: 10,
                    height: heightBase,
                    rx: 4, ry: 4,
                    fill: `url(#${gid})`
                });
                this.distanceText = svg.child(g, "text", { class: 'sim-text', x: xBase + 20, y: yBase + 20 }) as SVGTextElement;
                this.updateTheme();

                let pt = svgEl.createSVGPoint();
                svg.buttonEvents(this.distance,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, svgEl, ev);
                        let t = Math.max(0, Math.min(1, ((heightBase + yBase) - cur.y)/(heightBase)));
                        this.state.distanceState.setLevel(Math.floor(DistanceView.dmin + t * (DistanceView.dmax - DistanceView.dmin)));
                        this.updateDistance();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            if (this.state.distanceState.getLevel() === DistanceView.dmin) {
                                this.state.distanceState.setLevel(DistanceView.dmax);
                            } else {
                                this.state.distanceState.setLevel(this.state.distanceState.getLevel() - 1);
                            }
                            this.updateDistance();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            if (this.state.distanceState.getLevel() === DistanceView.dmax) {
                                this.state.distanceState.setLevel(DistanceView.dmin);
                            } else {
                                this.state.distanceState.setLevel(this.state.distanceState.getLevel() + 1);
                            }
                            this.updateDistance();
                        }
                    });

                accessibility.makeFocusable(this.distance);
                accessibility.setAria(this.distance, "slider", "Distance");
                this.distance.setAttribute("aria-valuemin", DistanceView.dmin.toString());
                this.distance.setAttribute("aria-valuemax", DistanceView.dmax.toString());
                this.distance.setAttribute("aria-orientation", "vertical");
            }
            this.element = g;
        }

        private attachEvents() {
        }

        private updateDistance() {
            let state = this.state;
            if (!state || !state.distanceState || !state.distanceState.sensorUsed)
                return;
            
            let t = Math.max(DistanceView.dmin, Math.min(DistanceView.dmax, state.distanceState.getLevel()))
            let per = Math.floor((state.distanceState.getLevel() - DistanceView.dmin) / (DistanceView.dmax - DistanceView.dmin) * 100)
            svg.setGradientValue(this.distanceGradient, 100 - per + "%");

            let unit = " mm";
            if (state.distanceUnit == pxsim.DistanceUnit.Meter) {
                unit = " m";
            }
            this.distanceText.textContent = t + unit;
            this.distance.setAttribute("aria-valuenow", t.toString());
            this.distance.setAttribute("aria-valuetext", t + unit);
            accessibility.setLiveContent(t + unit);
        }
    }
}