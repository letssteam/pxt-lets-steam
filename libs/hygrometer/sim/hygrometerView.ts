/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../libs/core/dal.d.ts"/>


namespace pxsim.visuals {
    export class HygrometerView implements IBoardPart<HygrometerState> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;
        private state: HygrometerState;
        private bus: EventBus;
        private btn: SVGGElement;

        private humidityGradient: SVGLinearGradientElement;
        private humidity: SVGRectElement;
        private humidityText: SVGTextElement;

        private static tmin = 0;
        private static tmax = 100;

        public init(bus: EventBus, state: HygrometerState, svgEl: SVGSVGElement, otherParams: Map<string>) {
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
            if (!state || !state.hygrometerState || !state.hygrometerState.sensorUsed) {
                if (this.humidity) {
                    this.svgEl.removeChild(this.element);
                    this.humidity = null;
                }
            } else if (state && state.hygrometerState && state.hygrometerState.sensorUsed) {
                this.mkHumidity();
                this.svgEl.appendChild(this.element);
                this.updateHumidity();
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {
            let On = "#7777ff";
            let Off = "#fff";
            svg.setGradientColors(this.humidityGradient, Off, On);
        }

        private mkHumidity() {
            let svgEl = this.svgEl;
            let defs = <SVGDefsElement>svg.child(svgEl, "defs", {});
            let g = <SVGGElement>svg.elt("g");

            if (!this.humidity) {
                let gid = "gradient-humidity";
                this.humidityGradient = svg.linearGradient(defs, gid);
                let xBase = 450;
                let yBase = 15;
                let heightBase = 64;
                svg.child(g, "rect", {
                    fill: "transparent",
                    x: xBase -5,
                    y: yBase-20,
                    width: 20,
                    height: heightBase+40,
                });

                this.humidity = <SVGRectElement>svg.child(g, "rect", {
                    class: "sim-humidity no-drag",
                    x: xBase,
                    y: yBase,
                    width: 10,
                    height: heightBase,
                    rx: 4, ry: 4,
                    fill: `url(#${gid})`
                });
                this.humidityText = svg.child(g, "text", { class: 'sim-text', x: xBase + 20, y: yBase + 20 }) as SVGTextElement;
                this.updateTheme();

                let pt = svgEl.createSVGPoint();
                svg.buttonEvents(g,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, svgEl, ev);
                        let t = Math.max(0, Math.min(1, ((heightBase + yBase) - cur.y) / (heightBase)));
                        this.state.hygrometerState.setLevel(Math.floor(HygrometerView.tmin + t * (HygrometerView.tmax - HygrometerView.tmin)));
                        this.updateHumidity();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            if (this.state.hygrometerState.getLevel() === -5) {
                                this.state.hygrometerState.setLevel(50);
                            } else {
                                this.state.hygrometerState.setLevel(this.state.hygrometerState.getLevel() - 1);
                            }
                            this.updateHumidity();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            if (this.state.hygrometerState.getLevel() === 50) {
                                this.state.hygrometerState.setLevel(-5);
                            } else {
                                this.state.hygrometerState.setLevel(this.state.hygrometerState.getLevel() + 1);
                            }
                            this.updateHumidity();
                        }
                    });

                accessibility.makeFocusable(this.humidity);
                accessibility.setAria(this.humidity, "slider", "Humidity");
                this.humidity.setAttribute("aria-valuemin", HygrometerView.tmin.toString());
                this.humidity.setAttribute("aria-valuemax", HygrometerView.tmax.toString());
                this.humidity.setAttribute("aria-orientation", "vertical");
            }
            this.element = g;
        }

        private attachEvents() {
        }

        private updateHumidity() {
            let state = this.state;
            if (!state || !state.hygrometerState || !state.hygrometerState.sensorUsed)
                return;
            
            let t = Math.max(HygrometerView.tmin, Math.min(HygrometerView.tmax, state.hygrometerState.getLevel()))
            let per = Math.floor((state.hygrometerState.getLevel() - HygrometerView.tmin) / (HygrometerView.tmax - HygrometerView.tmin) * 100)
            svg.setGradientValue(this.humidityGradient, 100 - per + "%");

            let unit = "%";

            this.humidityText.textContent = t + unit;
            this.humidity.setAttribute("aria-valuenow", t.toString());
            this.humidity.setAttribute("aria-valuetext", t + unit);
            accessibility.setLiveContent(t + unit);
        }
    }
}