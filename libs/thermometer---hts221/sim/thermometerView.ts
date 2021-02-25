/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {
    export class ThermometerView implements IBoardPart<ThermometerState> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;
        private state: ThermometerState;
        private bus: EventBus;
        private btn: SVGGElement;

        private thermometerGradient: SVGLinearGradientElement;
        private thermometer: SVGRectElement;
        private thermometerText: SVGTextElement;

        // Celsius
        private static tmin = -5;
        private static tmax = 50;

        public init(bus: EventBus, state: ThermometerState, svgEl: SVGSVGElement, otherParams: Map<string>) {
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
            if (!state || !state.thermometerState || !state.thermometerState.sensorUsed) {
                if (this.thermometer) {
                    this.svgEl.removeChild(this.element);
                    this.thermometer = null;
                }
            } else if (state && state.thermometerState && state.thermometerState.sensorUsed) {
                this.mkThermometer();
                this.svgEl.appendChild(this.element);
                this.updateTemperature();
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {
            let On = "#ff7777";
            let Off = "#fff";
            svg.setGradientColors(this.thermometerGradient, Off, On);
        }

        private mkThermometer() {
            let svgEl = this.svgEl;
            let defs = <SVGDefsElement>svg.child(svgEl, "defs", {});
            let g = <SVGGElement>svg.elt("g");

            if (!this.thermometer) {
                let gid = "gradient-thermometer";
                this.thermometerGradient = svg.linearGradient(defs, gid);
                let xBase = 25;
                let yBase = 15;
                let heightBase = 64;
                svg.child(g, "rect", {
                    fill: "transparent",
                    x: xBase -5,
                    y: yBase-20,
                    width: 20,
                    height: heightBase+40,
                });

                this.thermometer = <SVGRectElement>svg.child(g, "rect", {
                    class: "sim-thermometer no-drag",
                    x: xBase,
                    y: yBase,
                    width: 10,
                    height: heightBase,
                    rx: 4, ry: 4,
                    fill: `url(#${gid})`
                });
                this.thermometerText = svg.child(g, "text", { class: 'sim-text', x: xBase + 20, y: yBase + 20 }) as SVGTextElement;
                this.updateTheme();

                let pt = svgEl.createSVGPoint();
                svg.buttonEvents(g,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, svgEl, ev);
                        let t = Math.max(0, Math.min(1, ((heightBase + yBase) - cur.y) / (heightBase)));
                        this.state.thermometerState.setLevel(Math.floor(ThermometerView.tmin + t * (ThermometerView.tmax - ThermometerView.tmin)));
                        this.updateTemperature();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            if (this.state.thermometerState.getLevel() === -5) {
                                this.state.thermometerState.setLevel(50);
                            } else {
                                this.state.thermometerState.setLevel(this.state.thermometerState.getLevel() - 1);
                            }
                            this.updateTemperature();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            if (this.state.thermometerState.getLevel() === 50) {
                                this.state.thermometerState.setLevel(-5);
                            } else {
                                this.state.thermometerState.setLevel(this.state.thermometerState.getLevel() + 1);
                            }
                            this.updateTemperature();
                        }
                    });

                accessibility.makeFocusable(this.thermometer);
                accessibility.setAria(this.thermometer, "slider", "Thermometer");
                this.thermometer.setAttribute("aria-valuemin", ThermometerView.tmin.toString());
                this.thermometer.setAttribute("aria-valuemax", ThermometerView.tmax.toString());
                this.thermometer.setAttribute("aria-orientation", "vertical");
            }
            this.element = g;
        }

        private attachEvents() {
        }

        private updateTemperature() {
            let state = this.state;
            if (!state || !state.thermometerState || !state.thermometerState.sensorUsed)
                return;
            
            let t = Math.max(ThermometerView.tmin, Math.min(ThermometerView.tmax, state.thermometerState.getLevel()))
            let per = Math.floor((state.thermometerState.getLevel() - ThermometerView.tmin) / (ThermometerView.tmax - ThermometerView.tmin) * 100)
            svg.setGradientValue(this.thermometerGradient, 100 - per + "%");

            let unit = "°C";
            if (state.thermometerUnitState == pxsim.TemperatureUnit.Fahrenheit) {
                unit = "°F";
                t = ((t * 18) / 10 + 32) >> 0;
            }
            this.thermometerText.textContent = t + unit;
            this.thermometer.setAttribute("aria-valuenow", t.toString());
            this.thermometer.setAttribute("aria-valuetext", t + unit);
            accessibility.setLiveContent(t + unit);
        }
    }
}