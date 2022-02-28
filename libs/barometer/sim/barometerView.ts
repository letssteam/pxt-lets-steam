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

        private sliderDiv : HTMLDivElement;
        private slider: HTMLInputElement;
        private text: SVGElement;
        private board_icon : SVGElement;
        private isOpen: boolean = false;

        private readonly INPUT_ID : string = "PRESSURE-RANGE";
        private readonly ICON_SVG : string = `<rect x="0" y="0" width="504" height="208.25" fill="#00000000"/><g transform="translate(-97.992 -175.88)"><path d="m316.05 175.88c-1.793 0.1875-3.1523 1.6992-3.1523 3.5v201.25c0.0117 1.9297 1.5703 3.4922 3.5 3.5h67.203c1.9297-8e-3 3.4883-1.5703 3.5-3.5v-201.25c-0.0117-1.9297-1.5703-3.4922-3.5-3.5h-67.203c-0.11328-4e-3 -0.23047-4e-3 -0.34766 0zm3.8516 7h60.199v194.25h-60.199zm-111.83 33.074c-1.2656-0.0312-2.4531 0.61719-3.1055 1.707-0.65234 1.0859-0.67188 2.4414-0.043 3.543l20.301 36.227h-40.953c-1.9297 8e-3 -3.4883 1.5703-3.5 3.5v38.148c0.0117 1.9297 1.5703 3.4922 3.5 3.5h40.949l-20.301 36.051h4e-3c-0.94922 1.4336-0.71875 3.3398 0.53516 4.5117 1.2578 1.168 3.1758 1.2617 4.5391 0.21484l90.648-60.375c1.0234-0.64453 1.6445-1.7695 1.6445-2.9766s-0.62109-2.332-1.6445-2.9766l-90.648-60.375c-0.55859-0.41797-1.2266-0.66016-1.9258-0.69922zm283.85 0c-0.69922 0.0391-1.3672 0.28125-1.9258 0.69922l-90.648 60.375c-1 0.66016-1.5898 1.7812-1.5781 2.9766-0.0117 1.1953 0.57812 2.3164 1.5781 2.9766l90.648 60.375c1.3633 1.0469 3.2812 0.95313 4.5391-0.21484 1.2539-1.1719 1.4844-3.0781 0.53516-4.5117l-20.301-36.051h40.953c1.9297-8e-3 3.4883-1.5703 3.5-3.5v-38.148c-0.0117-1.9297-1.5703-3.4922-3.5-3.5h-40.949l20.301-36.227h-4e-3c0.62891-1.1016 0.60938-2.457-0.043-3.543-0.65234-1.0898-1.8398-1.7383-3.1055-1.707zm-10.148 14.523-16.102 28.699v4e-3c-0.62891 1.1016-0.60938 2.457 0.043 3.543 0.65234 1.0898 1.8398 1.7383 3.1055 1.707h43.398v31.148h-43.398c-1.2656-0.0312-2.4531 0.61719-3.1055 1.707-0.65234 1.0859-0.67188 2.4414-0.043 3.543l16.102 28.523-74.199-49.352zm-263.55 0.17578 74.199 49.352-74.199 49.352 16.102-28.523-4e-3 -4e-3c0.62891-1.1016 0.60938-2.457-0.043-3.543-0.65234-1.0898-1.8398-1.7383-3.1055-1.707h-43.398v-31.148h43.398c1.2656 0.0312 2.4531-0.61719 3.1055-1.707 0.65234-1.0859 0.67188-2.4414 0.043-3.543l-16.102-28.523zm-117.43 26.777c-1.6523 0.34375-2.8281 1.8125-2.8008 3.5v38.148c0.0078 1.9297 1.5703 3.4922 3.5 3.5h13.477c1.9297-8e-3 3.4883-1.5703 3.5-3.5v-38.148c-0.0117-1.9297-1.5703-3.4922-3.5-3.5h-13.477c-0.23438-0.0234-0.46875-0.0234-0.69922 0zm27.648 0c-1.6523 0.34375-2.8281 1.8125-2.8008 3.5v38.148c0.0117 1.9297 1.5703 3.4922 3.5 3.5h13.301c1.9297-8e-3 3.4922-1.5703 3.5-3.5v-38.148c-8e-3 -1.9297-1.5703-3.4922-3.5-3.5h-13.301c-0.23047-0.0234-0.46484-0.0234-0.69922 0zm27.477 0c-1.6523 0.34375-2.8281 1.8125-2.8008 3.5v38.148c8e-3 1.9297 1.5703 3.4922 3.5 3.5h13.477c1.9297-8e-3 3.4883-1.5703 3.5-3.5v-38.148c-0.0117-1.9297-1.5703-3.4922-3.5-3.5h-13.477c-0.23438-0.0234-0.46875-0.0234-0.69922 0zm373.27 0c-1.6523 0.34375-2.8281 1.8125-2.8008 3.5v38.148c0.0117 1.9297 1.5703 3.4922 3.5 3.5h13.477c1.9297-8e-3 3.4922-1.5703 3.5-3.5v-38.148c-8e-3 -1.9297-1.5703-3.4922-3.5-3.5h-13.477c-0.23047-0.0234-0.46484-0.0234-0.69922 0zm27.648 0h4e-3c-1.6523 0.34375-2.8281 1.8125-2.8008 3.5v38.148c8e-3 1.9297 1.5703 3.4922 3.5 3.5h13.301c1.9297-8e-3 3.4883-1.5703 3.5-3.5v-38.148c-0.0117-1.9297-1.5703-3.4922-3.5-3.5h-13.301c-0.23438-0.0234-0.46875-0.0234-0.69922 0zm27.477 0c-1.6523 0.34375-2.8281 1.8125-2.8008 3.5v38.148c0.0117 1.9297 1.5703 3.4922 3.5 3.5h13.477c1.9297-8e-3 3.4922-1.5703 3.5-3.5v-38.148c-8e-3 -1.9297-1.5703-3.4922-3.5-3.5h-13.477c-0.23047-0.0234-0.46484-0.0234-0.69922 0zm-479.32 7h6.4766v31.148h-6.4766zm27.648 0h6.3008v31.148h-6.3008zm27.477 0h6.4766v31.148h-6.4766zm373.27 0h6.4766v31.148h-6.4766zm27.648 0h6.3008v31.148h-6.3008zm27.477 0h6.4766v31.148h-6.4766z"/></g>`;

        private readonly pmin = 980;
        private readonly pmax = 1050;
        private readonly unitPerKeyPress = 2;

        public init(bus: EventBus, state: BarometerState, svgEl: SVGSVGElement, otherParams: Map<string>) {
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
            if (!state || !state.barometerState || !state.barometerState.sensorUsed) {
                if (this.sliderDiv) {
                    this.svgEl.removeChild(this.board_icon);
                    this.svgEl.removeChild(this.text);
                    document.body.removeChild(this.sliderDiv);
                    this.sliderDiv = null;
                }
            } else if (state && state.barometerState && state.barometerState.sensorUsed) {
                if (!this.sliderDiv) {
                    this.mkPressure();
                    this.svgEl.appendChild(this.board_icon);
                    this.svgEl.appendChild(this.text);
                    document.body.appendChild(this.sliderDiv);
                    this.updatePressure();
                    this.board_icon.dispatchEvent(new Event("click"));
                }
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {
        }

        private mkPressure() {
            
            if( this.sliderDiv ){
                return;
            }

            this.sliderDiv = document.createElement("div");
            let icon = document.createElement("div");
            this.slider = document.createElement("input")
            this.board_icon = svg.elt("g");
            this.text = svg.elt("text", {x: 520, y: 520, "font-family": "monospace", "font-size": 25, fill: "#FFFFFF", "text-anchor": "end" });

            this.board_icon.style.cursor = "pointer";
            this.board_icon.innerHTML = this.generateIcon( 100, 55, 415, 444 );
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
                this.state.barometerState.setLevel( newValue );
                this.updatePressure();
            });

            this.sliderDiv.style.position = "absolute";
            this.sliderDiv.style.top = "0";
            this.sliderDiv.style.left = "0";
            this.sliderDiv.style.width = "100%";
            this.sliderDiv.style.height = "15px";
            this.sliderDiv.style.transform = "translate(-50%) rotate(270deg) translate(-50%, 50%)";
            this.sliderDiv.style.display = "none";
            
            icon.style.width = "27px";
            icon.style.position = "absolute";
            icon.style.top = "50%";
            icon.style.right = "0";
            icon.style.transform = "translate(0, -50%) rotate(90deg)";
            icon.innerHTML = this.generateIcon();

            this.slider.id = this.INPUT_ID;
            this.slider.type = "range";
            this.slider.min = this.pmin.toString();
            this.slider.max = this.pmax.toString();
            this.slider.value = this.state.barometerState.getLevel().toString();

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
            this.slider.style.background = "linear-gradient(90deg, rgb(255 239 220) 0%, rgb(214 92 214) 100%)";

            this.slider.oninput = (ev) => {
                this.state.barometerState.setLevel(parseInt(this.slider.value));
                this.updatePressure();
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

        private updatePressure() {
            let state = this.state;
            if (!state || !state.barometerState || !state.barometerState.sensorUsed)
                return;
            
            let t = Math.max(this.pmin, Math.min(this.pmax, state.barometerState.getLevel()))

            let unit = "";
            switch(pressureUnit()){
                case PressureUnit.mBar:
                    unit = " mBar";
                    break;

                case PressureUnit.HectoPascal:
                    unit = " hPa";
                    break;
            }
            
            this.text.textContent = `${t + unit}`;
            accessibility.setLiveContent(t + unit);
        }

        private generateIcon(width?: number, height?: number, x?: number, y?: number) {
            let svgTag = `<svg version="1.1" viewBox="0 0 504 208.25" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"`;

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
            return Math.min( this.pmax, Math.max( this.pmin, value ) );
        }
    }
}