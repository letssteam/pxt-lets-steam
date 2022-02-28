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

        private sliderDiv : HTMLDivElement;
        private slider: HTMLInputElement;
        private text: SVGElement;
        private board_icon : SVGElement;
        private isOpen: boolean = false;

        private readonly INPUT_ID : string = "TEMPERATURE-RANGE";
        private readonly BOARD_ICON_ID : string = `BUTTON-${this.INPUT_ID}`;
        private readonly ICON_SVG : string = `<rect x="0" y="0" width="237.9964" height="498.67801" fill="#00000000" /><g id="g148" transform="translate(-231.003,-30.6692)"> <path d="m 359.8,362.63 v -85.289 h -22.398 v 85.289 c -22.438,5.0977 -39.199,25.129 -39.199,49.113 0,27.836 22.562,50.398 50.398,50.398 27.836,0 50.398,-22.562 50.398,-50.398 0,-23.988 -16.762,-44.02 -39.199,-49.113 z" id="path70" /><path d="M 460.6,218.54 H 421.944 V 179.341 H 460.6 c 4.6406,0 8.3984,-3.7617 8.3984,-8.3984 0,-4.6367 -3.7578,-8.3984 -8.3984,-8.3984 h -38.656 v -58.801 c 0,-40.359 -32.711,-73.074 -73.07,-73.074 -40.359,0 -73.07,32.715 -73.07,73.074 v 215.75 c -27.254,21.539 -44.801,54.812 -44.801,92.254 0,64.961 52.641,117.6 117.6,117.6 64.961,0 117.6,-52.641 117.6,-117.6 0,-37.199 -17.309,-70.297 -44.258,-91.844 v -84.559 h 38.656 c 4.6406,0 8.3984,-3.7617 8.3984,-8.3984 0,-4.6406 -3.7617,-8.4023 -8.4023,-8.4023 z m -49.152,114.47 c 24.121,19.285 37.953,47.98 37.953,78.73 0,55.578 -45.219,100.8 -100.8,100.8 -55.578,0 -100.8,-45.219 -100.8,-100.8 0,-30.957 14,-59.781 38.414,-79.07 l 6.3828,-5.0391 v -8.1367 l 0.004,-215.76 c 0,-31.031 25.246,-56.273 56.27,-56.273 31.023,0 56.27,25.246 56.27,56.273 v 58.801 h -50.941 c -4.6406,0 -8.3984,3.7617 -8.3984,8.3984 0,4.6367 3.7578,8.3984 8.3984,8.3984 h 50.941 v 39.199 l -50.941,0.004 c -4.6406,0 -8.3984,3.7617 -8.3984,8.3984 0,4.6367 3.7578,8.3984 8.3984,8.3984 h 50.941 v 92.629 z" id="path72" /></g>`;


        // Celsius
        private readonly tmin = -5;
        private readonly tmax = 50;
        private readonly unitPerKeyPress = 1;

        public init(bus: EventBus, state: ThermometerState, svgEl: SVGSVGElement, otherParams: Map<string>) {
            this.state = state;
            this.bus = bus;
            this.defs = [];
            this.svgEl = svgEl;
            this.updateState();
        }

        public moveToCoord(xy: Coord) {
        }

        public updateState() {
            let state = this.state;
            if (!state || !state.thermometerState || !state.thermometerState.sensorUsed) {
                if (this.sliderDiv) {
                    this.svgEl.removeChild(this.board_icon);
                    this.svgEl.removeChild(this.text);
                    document.body.removeChild(this.sliderDiv);
                    this.sliderDiv = null;
                }
            } else if (state && state.thermometerState && state.thermometerState.sensorUsed) {
                if (!this.sliderDiv) {
                    this.mkThermometer();
                    this.svgEl.appendChild(this.board_icon);
                    this.svgEl.appendChild(this.text);
                    document.body.appendChild(this.sliderDiv);
                    this.updateTemperature();
                    this.board_icon.dispatchEvent(new Event("click"));
                }
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {
        }

        private mkThermometer() {
            
            if( this.sliderDiv ){
                return;
            }

            this.sliderDiv = document.createElement("div");
            let icon = document.createElement("div");
            this.slider = document.createElement("input")
            this.board_icon = svg.elt("g");
            this.text = svg.elt("text", {x: 75, y: 30, "font-family": "monospace", "font-size": 25, fill: "#FFFFFF" });

            this.board_icon.id = this.BOARD_ICON_ID;
            this.board_icon.style.cursor = "pointer";
            this.board_icon.innerHTML = this.generateIcon( 65, 65, 25, 15 );
            this.board_icon.onclick = () => {
                this.sliderDiv.style.display = "block";
                setTimeout( () => {this.isOpen = true;}, 250);  // Avoid immediate closing
            };


            document.addEventListener( "click", (ev: any) => {
                if(!this.isOpen) { return; }

                for( let i = 0; i < ev.path.length; ++i){
                    if( ev.path[i].id == this.INPUT_ID || ev.path[i].id == this.BOARD_ICON_ID ){ return; }
                }

                this.sliderDiv.style.display = "none";
                this.isOpen = false;
            });

            document.addEventListener( "keydown", (ev: KeyboardEvent) => {

                if(!this.isOpen){ return; }

                switch( ev.key ){
                    case "ArrowUp":
                        this.slider.valueAsNumber += this.unitPerKeyPress; 
                        break;

                    case "ArrowDown":
                        this.slider.valueAsNumber -= this.unitPerKeyPress;
                        break;
                }

            });

            this.sliderDiv.style.position = "absolute";
            this.sliderDiv.style.top = "0";
            this.sliderDiv.style.left = "0";
            this.sliderDiv.style.width = "100%";
            this.sliderDiv.style.height = "15px";
            this.sliderDiv.style.transform = "translate(-50%) rotate(270deg) translate(-50%, 50%)";
            this.sliderDiv.style.display = "none";
            
            icon.style.width = "12px";
            icon.style.position = "absolute";
            icon.style.top = "50%";
            icon.style.right = "2px";
            icon.style.transform = "translate(0, -50%) rotate(90deg)";
            icon.innerHTML = this.generateIcon();

            this.slider.id = this.INPUT_ID;
            this.slider.type = "range";
            this.slider.min = this.tmin.toString();
            this.slider.max = this.tmax.toString();
            this.slider.value = this.state.thermometerState.getLevel().toString();

            this.slider.style.width = "calc(100% - 20px - 15px)";
            this.slider.style.display = "inline-block";
            this.slider.style.position = "absolute";
            this.slider.style.left = "15px";
            this.slider.style.top = "50%";
            this.slider.style.margin = "0";
            this.slider.style.transform = "translate(0, -50%)";

            this.slider.style.setProperty("appearance", "none");
            this.slider.style.height = "5px";
            this.slider.style.borderRadius = "100px";
            this.slider.style.background = "linear-gradient(90deg, rgb(73, 195, 243) 0%, rgb(255 79 79) 100%)";

            this.slider.oninput = (ev) => {
                this.state.thermometerState.setLevel(parseInt(this.slider.value));
                this.updateTemperature();
            }

            this.sliderDiv.append(icon);
            this.sliderDiv.append(this.slider);
            this.sliderDiv.append(this.text);
        }

        private updateTemperature() {
            let state = this.state;
            if (!state || !state.thermometerState || !state.thermometerState.sensorUsed)
                return;
            
            let t = Math.max(this.tmin, Math.min(this.tmax, state.thermometerState.getLevel()))

            let unit = "";

            switch(temperatureUnit()){
                case TemperatureUnit.Celsius:
                    unit = "°C";
                    break;

                case TemperatureUnit.Fahrenheit:
                    unit = "°F";
                    t = ((t * 18) / 10 + 32);
                    break;
            }

            this.text.textContent = `${t + unit}`;
            accessibility.setLiveContent(t + unit);
        }



        private generateIcon(width?: number, height?: number, x?: number, y?: number) {
            let svgTag = `<svg version="1.1" viewBox="0 0 237.9964 498.67801" id="svg150" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" fill="#FFFFFF"`;

            if( width != undefined && width > 0 ){
                svgTag += ` ${svgTag} width="${width}" `;
            }

            if( height != undefined && height > 0 ){
                svgTag += ` ${svgTag} height="${height}"`;
            }

            if( x != undefined && x > 0 ){
                svgTag += ` ${svgTag} x="${x}"`;
            }

            if( y != undefined && y > 0 ){
                svgTag += ` ${svgTag} y="${y}"`;
            }

            return `${svgTag}>${this.ICON_SVG}</svg>`;
        }
    }
}