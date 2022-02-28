/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {
    export class DistanceView implements IBoardPart<DistanceState> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;
        private state: DistanceState;
        private bus: EventBus;

        private sliderDiv : HTMLDivElement;
        private slider: HTMLInputElement;
        private text: SVGElement;
        private board_icon : SVGElement;
        private isOpen: boolean = false;

        private readonly INPUT_ID : string = "DISTANCE-RANGE";
        private readonly ICON_SVG : string = `<rect x="0" y="0" width="504" height="359.92" fill="#00000000"/><g transform="rotate(-90,250.98,278.98)"><path d="m170.04 28h201.73v504h-201.73v-504m181.66 246.98v-36.289h-92.863v-10.035l92.863 4e-3v-36.289h-46.324v-10.246h46.324v-36.289h-92.863v-10.035h92.863v-36.289h-46.324v-10.035h46.324v-36.289h-161.39v453.62l161.39 4e-3v-36.289h-46.324v-10.035h46.324v-36.289h-92.863v-10.035h92.863v-36.289h-46.324v-10.031h46.324v-36.508h-92.863v-10.035l92.863 4e-3v-36.289h-46.324v-10.035h46.324"/><path d="m529.96 28v12.594h-100.76v-12.594h100.76"/><path d="m529.96 532v-12.594h-100.76v12.594h100.76"/><path d="m473.17 462.84h-43.977l50.379 50.383 50.383-50.383h-44.191v-365.67h44.191l-50.383-50.383-50.379 50.383h43.977v365.67"/></g>`;
        
        private readonly dmin = 0;
        private readonly dmax = 2000;
        private readonly unitPerKeyPress = 5;

        public init(bus: EventBus, state: DistanceState, svgEl: SVGSVGElement, otherParams: Map<string>) {
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
            if (!state || !state.distanceState || !state.distanceState.sensorUsed) {
                if (this.sliderDiv) {
                    this.svgEl.removeChild(this.board_icon);
                    this.svgEl.removeChild(this.text);
                    document.body.removeChild(this.sliderDiv);
                    this.sliderDiv = null;
                }
            } else if (state && state.distanceState && state.distanceState.sensorUsed) {
                if (!this.sliderDiv) {
                    this.mkDistance();
                    this.svgEl.appendChild(this.board_icon);
                    this.svgEl.appendChild(this.text);
                    document.body.appendChild(this.sliderDiv);
                    this.updateDistance();
                    this.board_icon.dispatchEvent(new Event("click"));
                }
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {

        }

        private mkDistance() {
            
            if( this.sliderDiv ){
                return;
            }

            this.sliderDiv = document.createElement("div");
            let icon = document.createElement("div");
            this.slider = document.createElement("input")
            this.board_icon = svg.elt("g");
            this.text = svg.elt("text", {x: 8, y: 520, "font-family": "monospace", "font-size": 25, fill: "#FFFFFF" });

            this.board_icon.style.cursor = "pointer";
            this.board_icon.innerHTML = this.generateIcon( 60, 60, 10, 440 );
            this.board_icon.onclick = () => {
                this.sliderDiv.style.display = "block";
                SimGaugeMessage.askClose(this.INPUT_ID);
                this.isOpen = true;
            };

            document.addEventListener( "keydown", (ev: KeyboardEvent) => {

                if(!this.isOpen){ return; }

                let newValue = 0;

                switch( ev.key ){
                    case "ArrowUp":
                        newValue = this.constraintValue( this.slider.valueAsNumber + this.unitPerKeyPress );
                        break;

                    case "ArrowDown":
                        newValue = this.constraintValue( this.slider.valueAsNumber - this.unitPerKeyPress );
                        break;

                    default:
                        return;
                }

                this.slider.valueAsNumber = newValue;
                this.state.distanceState.setLevel( newValue );
                this.updateDistance();
            });

            this.sliderDiv.style.position = "absolute";
            this.sliderDiv.style.top = "0";
            this.sliderDiv.style.left = "0";
            this.sliderDiv.style.width = "100%";
            this.sliderDiv.style.height = "15px";
            this.sliderDiv.style.transform = "translate(-50%) rotate(270deg) translate(-50%, 50%)";
            this.sliderDiv.style.display = "none";
            
            icon.style.width = "15px";
            icon.style.position = "absolute";
            icon.style.top = "50%";
            icon.style.right = "0";
            icon.style.transform = "translate(0, -50%) rotate(90deg)";
            icon.innerHTML = this.generateIcon();

            this.slider.id = this.INPUT_ID;
            this.slider.type = "range";
            this.slider.min = this.dmin.toString();
            this.slider.max = this.dmax.toString();
            this.slider.value = this.state.distanceState.getLevel().toString();

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
            this.slider.style.background = "linear-gradient(90deg, rgb(255 239 220) 0%, rgb(97 178 47) 80%)";

            this.slider.oninput = (ev) => {
                this.state.distanceState.setLevel(parseInt(this.slider.value));
                this.updateDistance();
            }

            this.sliderDiv.append(icon);
            this.sliderDiv.append(this.slider);
            this.sliderDiv.append(this.text);
            
            SimGaugeMessage.registerOnAskClose( this.INPUT_ID, (id: string) => {
                if(!this.isOpen) { return; }

                this.sliderDiv.style.display = "none";
                this.isOpen = false;
            });
        }

        private updateDistance() {
            let state = this.state;
            if (!state || !state.distanceState || !state.distanceState.sensorUsed)
                return;
            
            let t = Math.max(this.dmin, Math.min(this.dmax, state.distanceState.getLevel()))

            let unit = "";
            let nbDigit = 0;

            switch(distanceUnit()) {
                case DistanceUnit.Meter:
                    unit = " m";
                    t /= 1000;
                    nbDigit = 1;
                    break;

                case DistanceUnit.Decimeter:
                    unit = " dm";
                    t /= 100;
                    nbDigit = 2;
                    break;

                case DistanceUnit.Centimeter:
                    unit = " cm";
                    t /= 10;
                    nbDigit = 3;
                    break;

                case DistanceUnit.Millimeter:
                    unit = " mm";
                    nbDigit = 4;
                    break;
            }
            
            this.text.textContent = `${t + unit}`;
            accessibility.setLiveContent(t + unit);
        }

        private generateIcon(width?: number, height?: number, x?: number, y?: number) {
            let svgTag = `<svg version="1.1" viewBox="0 0 504 359.92" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"`;

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

        private constraintValue(value: number){
            return Math.min( this.dmax, Math.max( this.dmin, value ) );
        }
    }
}