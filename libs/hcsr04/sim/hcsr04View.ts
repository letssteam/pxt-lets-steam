/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {
    export function mkHCSR04(xy: Coord = [50, 0]) : SVGElAndSize {
        let [x, y] = xy;
        let l = x;
        let t = y;
        let w = HCSR04_PART_WIDTH;
        let h = HCSR04_PART_HEIGHT;
        let img = <SVGGElement>svg.elt("image");

        svg.hydrate(img, {
            class: "sim-hcsr04", x: l, y: t, width: w, height: h,
            href: svg.toDataUri(HCSR04_PART)
        });
        return { el: img, x: l, y: t, w: w, h: h };
    }


    export class HCSR04View implements IBoardPart<HCSR04State> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;

        private drawGroup : SVGElement;
        private state: HCSR04State;

        private sliderDiv : HTMLDivElement;
        private slider: HTMLInputElement;
        private text: SVGElement;
        private isOpen: boolean = true;
        private readonly INPUT_ID : string = "DISTANCE-HCSR04-RANGE";
        private readonly ICON_SVG : string = `<rect x="0" y="0" width="504" height="359.92" fill="#00000000"/><g transform="rotate(-90,250.98,278.98)"><path d="m170.04 28h201.73v504h-201.73v-504m181.66 246.98v-36.289h-92.863v-10.035l92.863 4e-3v-36.289h-46.324v-10.246h46.324v-36.289h-92.863v-10.035h92.863v-36.289h-46.324v-10.035h46.324v-36.289h-161.39v453.62l161.39 4e-3v-36.289h-46.324v-10.035h46.324v-36.289h-92.863v-10.035h92.863v-36.289h-46.324v-10.031h46.324v-36.508h-92.863v-10.035l92.863 4e-3v-36.289h-46.324v-10.035h46.324"/><path d="m529.96 28v12.594h-100.76v-12.594h100.76"/><path d="m529.96 532v-12.594h-100.76v12.594h100.76"/><path d="m473.17 462.84h-43.977l50.379 50.383 50.383-50.383h-44.191v-365.67h44.191l-50.383-50.383-50.379 50.383h43.977v365.67"/></g>`;
        private readonly dmin = 40;
        private readonly dmax = 3000;

        public init(bus: EventBus, state: HCSR04State, svgEl: SVGSVGElement, otherParams: Map<string>) {
            this.state = state;
            this.defs = [];
            this.svgEl = svgEl;
            this.initDom();
            this.updateState();
        }

        public moveToCoord(xy: Coord) {
            translateEl(this.element, [xy[0], xy[1]]);
        }

        public updateState() {
            let state = this.state;
            if (!state && !state.isUsed()) {
                if (this.sliderDiv) {
                    document.body.removeChild(this.sliderDiv);
                    this.sliderDiv = null;
                }
            } else if (state && state.isUsed()) {
                if (!this.sliderDiv) {
                    this.mkSlider();
                    document.body.appendChild(this.sliderDiv);
                    this.updateDistance();
                }
            }
        }

        initDom() {
            this.element = svg.elt("g");
            this.svgEl = new DOMParser().parseFromString(HCSR04_PART, "image/svg+xml").querySelector("svg") as SVGSVGElement;
            svg.hydrate( this.svgEl, {
                class: "sim-hcsr04",
                width: HCSR04_PART_WIDTH,
                height: HCSR04_PART_HEIGHT
            });

            this.drawGroup = this.svgEl.getElementById("print_zone") as SVGElement;
            this.element.appendChild(this.svgEl);
        }


        getElement() {
            return this.element;
        }

        public updateTheme() {

        }

        private mkSlider() {
            let state = this.state;
            if( this.sliderDiv ){
                return;
            }

            this.sliderDiv = document.createElement("div");
            let icon = document.createElement("div");
            this.slider = document.createElement("input")
            this.text = this.svgEl.getElementsByTagName("text").item(0);

            this.element.onclick = () => {
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
            this.slider.min = this.dmin.toString();
            this.slider.max = this.dmax.toString();
            this.slider.value = state.getDistance(0).toString();

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
            this.slider.style.background = "linear-gradient(90deg, rgba(255,247,238,1) 0%, rgba(236,217,0,1) 100%)";

            this.sliderDiv.append(icon);
            this.sliderDiv.append(this.slider);
            
            SimGaugeMessage.registerOnAskClose( this.INPUT_ID, (id: string) => {
                if(!this.isOpen) { return; }

                this.sliderDiv.style.display = "none";
                this.isOpen = false;
            });

            this.slider.oninput = (ev) => {
                state.setDistance(parseInt(this.slider.value));
                this.updateDistance();

                if (state.distanceEvent[0] != null && state.getDistance(0) <= state.distanceActionEvent[0] && state.lastEvent != 0) {
                    thread.runInBackground(state.distanceEvent[0]);
                    state.lastEvent = 0;
                }
                else if (state.distanceEvent[1] != null && state.getDistance(0) >= state.distanceActionEvent[1] && state.lastEvent != 1) {
                    thread.runInBackground(state.distanceEvent[1]);
                    state.lastEvent = 1;
                }
                if ((!(state.getDistance(0) <= state.distanceActionEvent[0]) && state.distanceActionEvent[1] == null) || 
                    (!(state.getDistance(0) >= state.distanceActionEvent[1]) && state.distanceActionEvent[0] == null) ||
                    (!(state.getDistance(0) <= state.distanceActionEvent[0]) && !(state.getDistance(0) >= state.distanceActionEvent[1]))
                    ){
                    state.lastEvent = null;
                }
            }
        }

        private updateDistance() {
            let state = this.state;
            if (!state || !state.isUsed())
                return;

            this.text.getElementsByTagName("tspan").item(0).innerHTML = state.getDistance(0).toString() + ' mm';
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
    }


    const HCSR04_PART_WIDTH = 250;
    const HCSR04_PART_HEIGHT = 145.07;

    const HCSR04_PART = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="250" height="145.07" version="1.1" viewBox="0 0 66.146 38.383" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>HC-SR04 Ultrasonic Range Sensor</title>
    <defs>
    <linearGradient id="a">
    <stop stop-color="#d6d6d6" offset="0"/>
    <stop stop-color="#aaa" offset="1"/>
    </linearGradient>
    <pattern id="c" width="2" height="2" patternTransform="translate(0) scale(10)" patternUnits="userSpaceOnUse">
    <rect width="1" height="1"/>
    <rect x="1" y="1" width="1" height="1"/>
    </pattern>
    <linearGradient id="h">
    <stop stop-color="#777" offset="0"/>
    <stop stop-color="#b9b9b9" offset="1"/>
    </linearGradient>
    <radialGradient id="b" cx="276.31" cy="-89.243" r="38.73" gradientUnits="userSpaceOnUse" xlink:href="#h"/>
    <radialGradient id="g" cx="377.55" cy="9.1016" r="6.1313" gradientTransform="matrix(.13614 0 0 .27228 -267.3 192.45)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
    <radialGradient id="f" cx="377.55" cy="9.1016" r="6.1313" gradientTransform="matrix(.13614 0 0 .27228 -264.24 192.45)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
    <radialGradient id="e" cx="377.55" cy="9.1016" r="6.1313" gradientTransform="matrix(.13614 0 0 .27228 -261.17 192.45)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
    <radialGradient id="d" cx="377.55" cy="9.1016" r="6.1313" gradientTransform="matrix(.13614 0 0 .27228 -258.1 192.45)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
    </defs>
    <metadata>
    <rdf:RDF>
    <cc:Work rdf:about="">
    <dc:format>image/svg+xml</dc:format>
    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
    <dc:title>HC-SR04 Ultrasonic Range Sensor</dc:title>
    <dc:creator>
    <cc:Agent>
    <dc:title>Florian "adlerweb" Knodt</dc:title>
    </cc:Agent>
    </dc:creator>
    <dc:rights>
    <cc:Agent>
    <dc:title>© Adlerweb//BitBastelei · www.adlerweb.info</dc:title>
    </cc:Agent>
    </dc:rights>
    <cc:license rdf:resource="http://creativecommons.org/publicdomain/zero/1.0/"/>
    </cc:Work>
    <cc:License rdf:about="http://creativecommons.org/publicdomain/zero/1.0/">
    <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"/>
    <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"/>
    <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"/>
    </cc:License>
    </rdf:RDF>
    </metadata>
    <rect x="12.869" y="31.636" width="39.688" height="6.6146" ry="3.3073" fill-opacity=".50413" stroke="#fff" stroke-width=".26458"/>
    <text x="32.401127" y="37.104969" fill="#ffffff" font-family="monospace" font-size="7.0556px" stroke-width=".26458" xml:space="preserve"><tspan x="32.401127" y="37.104969" fill="#ffffff" font-size="7.0556px" stroke-width=".26458" text-align="center" text-anchor="middle">3000 mm</tspan></text>
    <g transform="translate(-177.67 197.59)">
    <rect transform="scale(-1)" x="-243.82" y="166.8" width="66.146" height="30.791" rx="0" ry="0" fill="#456f93"/>
    <path d="m221.34-175.46-4.3126 4.3126v-4.5909l-4.3266-4.3266v-14.909" fill="none" stroke="#355a7c" stroke-width="1.2607"/>
    <path d="m209.61-194.78v3.6356l1.419 1.419v18.373l-3.7873-2.1866-6.9693-6.9693" fill="none" stroke="#355a7c" stroke-width="1.2607"/>
    <g transform="matrix(-.13614 0 0 -.13614 268.23 -193.69)">
    <circle cx="276.31" cy="-89.147" r="92.979" fill="#dcdcdc"/>
    <circle cx="276.31" cy="-89.147" r="77.446" fill="#222"/>
    <circle cx="276.31" cy="-89.147" r="59.733" fill="#777" fill-opacity=".99196"/>
    <circle cx="276.31" cy="-89.243" r="38.73" fill="url(#b)"/>
    <circle cx="276.41" cy="-89.243" r="2.9867" fill="#777" fill-opacity=".81769"/>
    <circle cx="276.31" cy="-89.147" r="59.733" fill="url(#c)" opacity=".397"/>
    </g>
    <g transform="matrix(-.13614 0 0 -.13614 228.3 -193.69)">
    <circle cx="276.31" cy="-89.147" r="92.979" fill="#dcdcdc"/>
    <circle cx="276.31" cy="-89.147" r="77.446" fill="#222"/>
    <circle cx="276.31" cy="-89.147" r="59.733" fill="#777" fill-opacity=".99196"/>
    <circle cx="276.31" cy="-89.243" r="38.73" fill="url(#b)"/>
    <circle cx="276.41" cy="-89.243" r="2.9867" fill="#777" fill-opacity=".81769"/>
    <circle cx="276.31" cy="-89.147" r="59.733" fill="url(#c)" opacity=".397"/>
    </g>
    <circle transform="scale(-1)" cx="-180.05" cy="168.95" r="1.469" fill="#fff" stroke="#505132" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5403"/>
    <circle transform="scale(-1)" cx="-180.05" cy="195.44" r="1.469" fill="#fff" stroke="#505132" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5403"/>
    <circle transform="scale(-1)" cx="-241.72" cy="168.95" r="1.469" fill="#fff" stroke="#505132" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5403"/>
    <circle transform="scale(-1)" cx="-241.72" cy="195.44" r="1.469" fill="#fff" stroke="#505132" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5403"/>
    <rect transform="scale(-1)" x="-218.67" y="167.72" width="15.099" height="6.0841" ry="3.042" fill="#878787" stroke="#424242" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5403"/>
    <rect transform="scale(-1)" x="-216.74" y="193.26" width="1.6694" height="3.3388" ry=".83471" fill="url(#g)"/>
    <rect transform="scale(-1)" x="-213.67" y="193.26" width="1.6694" height="3.3388" ry=".83471" fill="url(#f)"/>
    <rect transform="scale(-1)" x="-210.6" y="193.26" width="1.6694" height="3.3388" ry=".83471" fill="url(#e)"/>
    <rect transform="scale(-1)" x="-207.54" y="193.26" width="1.6694" height="3.3388" ry=".83471" fill="url(#d)"/>
    <text transform="scale(-1)" x="-218.15706" y="178.502" fill="#e6e6e6" font-family="monospace" font-size="3.2384px" letter-spacing="0px" stroke-width=".080959" word-spacing="0px" style="line-height:1.25" xml:space="preserve"><tspan x="-218.15706" y="178.502" fill="#e6e6e6" font-family="'Sony Fixed'" stroke-width=".080959">HC-SR04</tspan></text>
    <text transform="rotate(90)" x="-192.65651" y="-215.06448" fill="#e6e6e6" font-family="'Sony Fixed'" font-size="2.2788px" letter-spacing="0px" stroke-width=".05697" word-spacing="0px" style="line-height:1.25" xml:space="preserve"><tspan x="-192.65651" y="-215.06448" style="line-height:1.35">Vcc</tspan><tspan x="-192.65651" y="-211.9881" style="line-height:1.35">Trig</tspan><tspan x="-192.65651" y="-208.91171" style="line-height:1.35">Echo</tspan><tspan x="-192.65651" y="-205.83531" style="line-height:1.35">Gnd</tspan></text>
    <text transform="scale(-1)" x="-238.59808" y="195.67839" fill="#e6e6e6" font-family="monospace" font-size="3.2384px" letter-spacing="0px" stroke-width=".080959" word-spacing="0px" style="line-height:1.25" xml:space="preserve"><tspan x="-238.59808" y="195.67839" fill="#e6e6e6" font-family="'Sony Fixed'" stroke-width=".080959">T</tspan></text>
    <text transform="scale(-1)" x="-185.02849" y="195.67839" fill="#e6e6e6" font-family="monospace" font-size="3.2384px" letter-spacing="0px" stroke-width=".080959" word-spacing="0px" style="line-height:1.25" xml:space="preserve"><tspan x="-185.02849" y="195.67839" fill="#e6e6e6" font-family="'Sony Fixed'" stroke-width=".080959">R</tspan></text>
    </g>
    </svg>`;
}