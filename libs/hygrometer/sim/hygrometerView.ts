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

        private sliderDiv : HTMLDivElement;
        private slider: HTMLInputElement;
        private text: SVGElement;
        private board_icon : SVGElement;
        private isOpen: boolean = false;

        private readonly INPUT_ID : string = "HUMIDITY-RANGE";
        private readonly BOARD_ICON_ID : string = `BUTTON-${this.INPUT_ID}`;
        private readonly ICON_SVG : string = `<rect x="0" y="0" width="347.20001" height="492.7955" fill="#00000000" /> <g id="g152" transform="translate(-176.395,-33.605)"> <path d="M 443.04,184.27 C 410.981,138.282 377.825,90.731 357.833,38.98 c -1.25,-3.2383 -4.3594,-5.3711 -7.8242,-5.375 h -0.0117 c -3.4609,0 -6.5742,2.1289 -7.8281,5.3555 -19.875,51.07 -52.832,98.398 -84.688,144.17 -41.699,59.887 -81.086,116.45 -81.086,170.54 0,95.246 77.875,172.73 173.6,172.73 95.725,0 173.6,-77.488 173.6,-172.73 0,-53.879 -39.129,-109.99 -80.559,-169.4 z M 349.997,509.6 c -86.457,0 -156.8,-69.949 -156.8,-155.93 0,-48.828 37.918,-103.29 78.062,-160.95 28.582,-41.047 58.012,-83.328 78.703,-129.02 20.82,46.316 50.496,88.871 79.297,130.18 39.879,57.18 77.539,111.19 77.539,159.79 0,85.984 -70.344,155.93 -156.8,155.93 z" id="path70" /> <path d="m 409.46,274.69 c -3.6836,-2.8047 -8.9609,-2.1055 -11.777,1.5781 l -104.06,136.25 c -2.8164,3.6836 -2.1094,8.9609 1.5742,11.777 1.5234,1.1602 3.3164,1.7266 5.0898,1.7266 2.5312,0 5.0273,-1.1367 6.6797,-3.3047 l 104.06,-136.25 c 2.8203,-3.6914 2.1172,-8.9609 -1.5664,-11.777 z" id="path72" /> <path d="m 346.21,315.18 c 0,-21.352 -17.309,-38.652 -38.656,-38.652 -21.363,0 -38.664,17.305 -38.664,38.652 0,21.352 17.297,38.664 38.664,38.664 21.348,0.004 38.656,-17.305 38.656,-38.664 z m -60.516,0 c 0,-12.047 9.8125,-21.852 21.863,-21.852 12.051,0 21.855,9.8047 21.855,21.852 0,12.051 -9.8047,21.863 -21.855,21.863 -12.055,0 -21.863,-9.8047 -21.863,-21.863 z" id="path74" /> <path d="m 392.12,353.85 c -21.359,0 -38.664,17.305 -38.664,38.656 0,21.352 17.305,38.664 38.664,38.664 21.352,0 38.656,-17.309 38.656,-38.664 0,-21.352 -17.305,-38.656 -38.656,-38.656 z m 0,60.52 c -12.051,0 -21.863,-9.8047 -21.863,-21.863 0,-12.051 9.8125,-21.855 21.863,-21.855 12.051,0 21.855,9.8047 21.855,21.855 0.008,12.059 -9.7969,21.863 -21.855,21.863 z" id="path76" /> </g>`;
        private readonly BACKGROUND_COLOR : string = "#39474e";
        private readonly unitPerKeyPress = 1;

        public init(bus: EventBus, state: HygrometerState, svgEl: SVGSVGElement, otherParams: Map<string>) {
            this.state = state;
            this.bus = bus;
            this.defs = [];
            this.svgEl = svgEl;
            this.updateState();
        }

        public updateState() {
            let state = this.state;
            if (!state || !state.hygrometerState || !state.hygrometerState.sensorUsed) {
                if (this.sliderDiv) {
                    this.svgEl.removeChild(this.board_icon);
                    this.svgEl.removeChild(this.text);
                    document.body.removeChild(this.sliderDiv);
                    this.sliderDiv = null;
                }
            } else if (state && state.hygrometerState && state.hygrometerState.sensorUsed) {
                if (!this.sliderDiv) {
                    this.mkHumidity();
                    this.svgEl.appendChild(this.board_icon);
                    this.svgEl.appendChild(this.text);
                    document.body.appendChild(this.sliderDiv);
                    this.updateHumidity();
                    this.board_icon.dispatchEvent(new Event("click"));
                    this.board_icon.focus();
                }
            }
        }

        public updateTheme() {
        }

        public moveToCoord(xy: Coord) {
        }

        getElement() {
            return this.element;
        }

        private mkHumidity() {
            
            if( this.sliderDiv ){
                return;
            }

            this.sliderDiv = document.createElement("div");
            let icon = document.createElement("div");
            this.slider = document.createElement("input")
            this.board_icon = svg.elt("g");
            this.text = svg.elt("text", {x: 410, y: 30, "font-family": "monospace", "font-size": 25, fill: "#FFFFFF" });

            this.board_icon.id = this.BOARD_ICON_ID;
            this.board_icon.style.cursor = "pointer";
            this.board_icon.innerHTML = this.generateIcon( 60, 60, 450, 15 );
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
            this.sliderDiv.style.backgroundColor = this.BACKGROUND_COLOR;
            
            icon.style.width = "15px";
            icon.style.position = "absolute";
            icon.style.top = "50%";
            icon.style.right = "0";
            icon.style.transform = "translate(0, -50%) rotate(90deg)";
            icon.style.backgroundColor = this.BACKGROUND_COLOR;
            icon.innerHTML = this.generateIcon();

            this.slider.id = this.INPUT_ID;
            this.slider.type = "range";
            this.slider.min = "0";
            this.slider.max = "100"
            this.slider.value = this.state.hygrometerState.getLevel().toString();

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
            this.slider.style.background = "linear-gradient(90deg, rgb(255 239 220) 0%, rgb(73 195 243) 80%)";

            this.slider.oninput = (ev) => {
                this.state.hygrometerState.setLevel(parseInt(this.slider.value));
                this.updateHumidity();
            }

            this.sliderDiv.append(icon);
            this.sliderDiv.append(this.slider);
            this.sliderDiv.append(this.text);
        }

        private updateHumidity() {
            if (!this.state || !this.state.hygrometerState || !this.state.hygrometerState.sensorUsed)
                return;
            
            let t = this.slider.value + "%";
            this.text.textContent = t;
            accessibility.setLiveContent(t);
        }

        private generateIcon(width?: number, height?: number, x?: number, y?: number) {
            let svgTag = `<svg version="1.1" viewBox="0 0 347.20001 492.7955" id="svg154" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" fill="#FFFFFF"`;

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