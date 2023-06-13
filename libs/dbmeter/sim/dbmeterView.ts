/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {
    export class DBMeterView implements IBoardPart<DBMeterState> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;
        private state: DBMeterState;
        private bus: EventBus;

        private sliderDiv : HTMLDivElement;
        private slider: HTMLInputElement;
        private text: SVGElement;
        private board_icon : SVGElement;
        private isOpen: boolean = false;

        private readonly INPUT_ID : string = "DBMETER-RANGE";
        private readonly ICON_SVG : string = `<path d="M33 46V22c0-9.35 7.65-17 17-17s17 7.65 17 17v24c0 9.35-7.65 17-17 17s-17-7.65-17-17zm46 0H69c0 10.477-8.523 19-19 19s-19-8.523-19-19H21c0 14.284 10.386 26.183 24 28.56V85H34c-1.65 0-3 1.35-3 3v4c0 1.65 1.35 3 3 3h32c1.65 0 3-1.35 3-3v-4c0-1.65-1.35-3-3-3H55V74.56C68.614 72.183 79 60.284 79 46z"/>`;
        
        private readonly dBmin = 0;
        private readonly dBmax = 120;

        public init(bus: EventBus, state: DBMeterState, svgEl: SVGSVGElement, otherParams: Map<string>) {
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
            if (!state || !state.dbMeterState || !state.dbMeterState.sensorUsed) {
                if (this.sliderDiv) {
                    this.svgEl.removeChild(this.board_icon);
                    this.svgEl.removeChild(this.text);
                    document.body.removeChild(this.sliderDiv);
                    this.sliderDiv = null;
                }
            } else if (state && state.dbMeterState && state.dbMeterState.sensorUsed) {
                if (!this.sliderDiv) {
                    this.mkDBMeter();
                    this.svgEl.appendChild(this.board_icon);
                    this.svgEl.appendChild(this.text);
                    document.body.appendChild(this.sliderDiv);
                    this.updateDecibel();
                    this.board_icon.dispatchEvent(new Event("click"));
                }
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {

        }

        private mkDBMeter() {
            
            if( this.sliderDiv ){
                return;
            }

            this.sliderDiv = document.createElement("div");
            let icon = document.createElement("div");
            this.slider = document.createElement("input")
            this.board_icon = svg.elt("g");
            this.text = svg.elt("text", {x: 233, y: 520, "font-family": "monospace", "font-size": 25, fill: "#FFFFFF" });

            this.board_icon.style.cursor = "pointer";
            this.board_icon.innerHTML = this.generateIcon( 60, 60, 235, 440 );
            this.board_icon.onclick = () => {
                this.sliderDiv.style.display = "block";
                SimGaugeMessage.askClose(this.INPUT_ID);
                this.isOpen = true;
            };

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
            this.slider.min = this.dBmin.toString();
            this.slider.max = this.dBmax.toString();
            this.slider.value = this.state.dbMeterState.getLevel().toString();

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
            this.slider.style.background = "linear-gradient(90deg, rgb(0 164 255) 0%, rgb(255 0 0) 100%)";

            this.slider.oninput = (ev) => {
                this.state.dbMeterState.setLevel(parseInt(this.slider.value));
                this.updateDecibel();
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

        private updateDecibel() {
            let state = this.state;
            if (!state || !state.dbMeterState || !state.dbMeterState.sensorUsed)
                return;
            
            let t = Math.max(this.dBmin, Math.min(this.dBmax, state.dbMeterState.getLevel()))
            
            this.text.textContent = `${t}dB`;
            accessibility.setLiveContent(t + "dB");
        }

        private generateIcon(width?: number, height?: number, x?: number, y?: number) {
            let svgTag = `<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" xml:space="preserve"`;

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
            return Math.min( this.dBmax, Math.max( this.dBmin, value ) );
        }
    }
}