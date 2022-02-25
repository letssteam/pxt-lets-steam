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

        private readonly pmin = 980;
        private readonly pmax = 1050;
        private readonly INPUT_ID : string = "PRESSURE-RANGE";
        private readonly BOARD_ICON_ID : string = `BUTTON-${this.INPUT_ID}`;
        private readonly ICON_SVG : string = `<rect x="0" y="0" width="484.32" height="484.17" fill="#00000000"/><g transform="translate(-107.84,-37.914)"><path d="m350 37.914c-133.57 0-242.16 108.59-242.16 242.16 0 133.42 108.59 242.01 242.16 242.01s242.16-108.59 242.16-242.01c0-133.57-108.6-242.16-242.16-242.16zm0 472.82c-127.29 0-230.81-103.45-230.81-230.66 0-127.29 103.52-230.81 230.81-230.81s230.81 103.52 230.81 230.81c0 127.21-103.53 230.66-230.81 230.66z"/><path d="m549.86 259.64c-9.2344-93.609-83.773-168.98-177.16-179.28-57.969-6.4336-113.66 11.352-156.72 49.945-42.531 38.066-66.898 92.629-66.898 149.69 0 44.801 14.453 87.254 41.848 122.59 7.1133 9.1562 18.391 14.68 30.195 14.68h20.887c13.621 0 26.336-7.3398 33.223-19.07 4.8438-8.3242 13.773-13.469 23.383-13.469h102.77c9.6094 0 18.539 5.1445 23.383 13.469 6.8125 11.805 19.602 19.07 33.223 19.07h20.961c11.805 0 23.004-5.4492 30.117-14.531 31.41-40.633 45.938-91.488 40.793-143.1zm-49.871 136.21c-4.918 6.3555-12.789 10.141-21.113 10.141h-20.961c-9.6094 0-18.539-5.1445-23.383-13.469-6.8125-11.805-19.523-19.07-33.223-19.07h-102.69c-13.621 0-26.336 7.3398-33.223 19.07-4.8438 8.3242-13.773 13.469-23.383 13.469h-20.887c-8.3242 0-16.27-3.8594-21.188-10.215-3.9336-5.1445-7.5664-10.441-10.898-15.891l25.578-14.758c2.6484-1.5117 3.5586-4.918 2.043-7.5664-1.5117-2.6484-4.918-3.5586-7.5664-2.043l-25.652 14.832c-14.074-25.805-21.719-54.41-22.703-84.301h29.742c3.0273 0 5.5234-2.4961 5.5234-5.5234s-2.4961-5.5234-5.5234-5.5234h-29.891c0.75781-29.742 8.6289-58.648 22.398-84.531l26.031 15.059c0.83203 0.53125 1.8164 0.75781 2.7227 0.75781 1.8906 0 3.7852-0.98438 4.7656-2.7227 1.5117-2.6484 0.60547-6.0547-2.043-7.5664l-26.109-15.059c9.5352-15.512 21.266-29.816 35.039-42.152 8.3984-7.5664 17.328-14.152 26.715-19.977v0.0742l15.137 26.258c0.98438 1.7422 2.875 2.7227 4.7656 2.7227 0.90625 0 1.8906-0.22656 2.7227-0.75781 2.6484-1.5117 3.5586-4.918 2.043-7.5664l-15.137-26.258-0.0742-0.0742c25.957-14.152 54.715-21.871 84.758-22.629v30.422c0 3.0273 2.4961 5.5234 5.5234 5.5234s5.5234-2.4961 5.5234-5.5234v-30.422c5.2969 0.15234 10.672 0.45312 15.969 1.0586 24.594 2.7227 47.75 10.367 68.637 21.719l-15.137 26.258c-1.5117 2.6484-0.60547 6.0547 2.043 7.5664 0.83203 0.53125 1.8164 0.75781 2.7227 0.75781 1.8906 0 3.7852-0.98438 4.7656-2.7227l15.137-26.258c25.125 15.59 46.238 36.93 61.75 62.055l-26.109 15.059c-2.6484 1.5117-3.5586 4.918-2.043 7.5664 0.98438 1.7422 2.875 2.7227 4.7656 2.7227 0.90625 0 1.8906-0.22656 2.7227-0.75781l26.031-15.059c11.504 21.34 19.145 45.027 21.645 70.227 0.45312 4.7656 0.67969 9.5352 0.83203 14.301h-29.891c-3.0273 0-5.5234 2.4961-5.5234 5.5234s2.4961 5.5234 5.5234 5.5234h29.891c-0.98437 29.664-8.7773 58.422-22.855 84.301l-25.652-14.832c-2.6484-1.5117-5.9766-0.60547-7.5664 2.043-1.5117 2.6484-0.60547 5.9766 2.043 7.5664l25.652 14.758c-3.0898 5.375-6.7969 10.75-10.734 15.895z"/><path d="m355.68 242.84-63.492-80.52c-3.2539-4.1641-8.8555-5.1445-13.32-2.2695-4.4648 2.8008-5.9766 8.25-3.6328 12.941l45.859 93.609c-1.2109 3.6328-2.043 7.418-2.043 11.426 0 19.449 15.816 35.188 35.266 35.188s35.188-15.816 35.188-35.188c0.0781-19.07-15.059-34.43-33.824-35.188zm-64.93-64.023 51.988 65.988c-5.75 2.043-10.82 5.4492-14.758 9.9141zm63.566 122.97c-13.168 0-23.914-10.746-23.914-23.836 0-13.094 10.746-23.836 23.914-23.836s23.836 10.746 23.836 23.836c4e-3 13.09-10.668 23.836-23.836 23.836z"/><path d="m398.96 418.11h-97.922c-14.832 0-26.863 12.031-26.863 26.863s12.031 26.863 26.863 26.863h98c14.832 0 26.863-12.031 26.863-26.863s-12.109-26.863-26.941-26.863zm0 42.379h-97.922c-8.5508 0-15.512-6.9609-15.512-15.512 0-8.5508 6.9609-15.512 15.512-15.512h98c8.5508 0 15.512 6.9609 15.512 15.512 0 8.5469-6.9609 15.512-15.59 15.512z"/></g>`;


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
            this.text = svg.elt("text", {x: 405, y: 515, "font-family": "monospace", "font-size": 25, fill: "#FFFFFF" });

            this.board_icon.id = this.BOARD_ICON_ID;
            this.board_icon.style.cursor = "pointer";
            this.board_icon.innerHTML = this.generateIcon( 55, 55, 450, 435 );
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
            
            this.text.textContent = `${"0".repeat(4 - this.slider.value.length)}${t + unit}`;
            accessibility.setLiveContent(t + unit);
        }

        private generateIcon(width?: number, height?: number, x?: number, y?: number) {
            let svgTag = `<svg version="1.1" viewBox="0 0 484.32 484.17" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"`;

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