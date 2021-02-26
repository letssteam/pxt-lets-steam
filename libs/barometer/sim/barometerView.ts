/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {
    export class BarometerView implements IBoardPart<BarometerState> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;
        private state: BarometerState;
        private bus: EventBus;
        private btn: SVGGElement;

        private pressureGradient: SVGLinearGradientElement;
        private pressure: SVGRectElement;
        private pressureText: SVGTextElement;

        private static pmin = 980;
        private static pmax = 1050;

        public init(bus: EventBus, state: BarometerState, svgEl: SVGSVGElement, otherParams: Map<string>) {
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
            if (!state || !state.barometerState || !state.barometerState.sensorUsed) {
                if (this.pressure) {
                    this.svgEl.removeChild(this.element);
                    this.pressure = null;
                }
            } else if (state && state.barometerState && state.barometerState.sensorUsed) {
                this.mkPressure();
                this.svgEl.appendChild(this.element);
                this.updatePressure();
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {
            let On = "#77ff77";
            let Off = "#fff";
            svg.setGradientColors(this.pressureGradient, Off, On);
        }

        private mkPressure() {
            let svgEl = this.svgEl;
            let defs = <SVGDefsElement>svg.child(svgEl, "defs", {});
            let g = <SVGGElement>svg.elt("g");

            if (!this.pressure) {
                let gid = "gradient-pressure";
                this.pressureGradient = svg.linearGradient(defs, gid);
                let xBase = 450;
                let yBase = 450;
                let heightBase = 64;
                svg.child(g, "rect", {
                    fill: "transparent",
                    x: xBase -5,
                    y: yBase-20,
                    width: 20,
                    height: heightBase+40,
                });

                this.pressure = <SVGRectElement>svg.child(g, "rect", {
                    class: "sim-pressure no-drag",
                    x: xBase,
                    y: yBase,
                    width: 10,
                    height: heightBase,
                    rx: 4, ry: 4,
                    fill: `url(#${gid})`
                });
                this.pressureText = svg.child(g, "text", { class: 'sim-text', x: xBase + 20, y: yBase + 20 }) as SVGTextElement;
                this.updateTheme();

                let pt = svgEl.createSVGPoint();
                svg.buttonEvents(g,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, svgEl, ev);
                        let t = Math.max(0, Math.min(1, ((heightBase + yBase) - cur.y)/(heightBase)));
                        this.state.barometerState.setLevel(Math.floor(BarometerView.pmin + t * (BarometerView.pmax - BarometerView.pmin)));
                        this.updatePressure();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            if (this.state.barometerState.getLevel() === BarometerView.pmin) {
                                this.state.barometerState.setLevel(BarometerView.pmax);
                            } else {
                                this.state.barometerState.setLevel(this.state.barometerState.getLevel() - 1);
                            }
                            this.updatePressure();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            if (this.state.barometerState.getLevel() === BarometerView.pmax) {
                                this.state.barometerState.setLevel(BarometerView.pmin);
                            } else {
                                this.state.barometerState.setLevel(this.state.barometerState.getLevel() + 1);
                            }
                            this.updatePressure();
                        }
                    });

                accessibility.makeFocusable(this.pressure);
                accessibility.setAria(this.pressure, "slider", "Pressure");
                this.pressure.setAttribute("aria-valuemin", BarometerView.pmin.toString());
                this.pressure.setAttribute("aria-valuemax", BarometerView.pmax.toString());
                this.pressure.setAttribute("aria-orientation", "vertical");
            }
            this.element = g;
        }

        private attachEvents() {
        }

        private updatePressure() {
            let state = this.state;
            if (!state || !state.barometerState || !state.barometerState.sensorUsed)
                return;
            
            let t = Math.max(BarometerView.pmin, Math.min(BarometerView.pmax, state.barometerState.getLevel()))
            let per = Math.floor((state.barometerState.getLevel() - BarometerView.pmin) / (BarometerView.pmax - BarometerView.pmin) * 100)
            svg.setGradientValue(this.pressureGradient, 100 - per + "%");

            let unit = " hPa";
            if (state.pressureUnit == pxsim.PressureUnit.mBar) {
                unit = " mBar";
            }
            this.pressureText.textContent = t + unit;
            this.pressure.setAttribute("aria-valuenow", t.toString());
            this.pressure.setAttribute("aria-valuetext", t + unit);
            accessibility.setLiveContent(t + unit);
        }
    }
}