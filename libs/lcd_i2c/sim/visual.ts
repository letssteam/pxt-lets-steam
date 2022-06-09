namespace pxsim.visuals {    
    // For the intructions
    export function mkLCDI2C2Part(xy: Coord = [0, 0]): SVGElAndSize {
        let [x, y] = xy;
        let l = x;
        let t = y;
        let w = LCD_PART_WIDTH;
        let h = LCD_PART_HEIGHT;
        let img = <SVGGElement>svg.elt("image");
        svg.hydrate(img, {
            class: "sim-i2c-lcd", x: l, y: t, width: w, height: h,
            href: svg.toDataUri(LCD_PART)
        });
        return { el: img, x: l, y: t, w: w, h: h };
    }

    export class LCDI2C2View implements IBoardPart<LCDState> {
        style: string;
        element: SVGElement;
        defs: SVGElement[];
        image: SVGSVGElement;
        
        private backlight: SVGGElement;
        private screen: SVGGElement;
        private part: SVGElAndSize;
        private bus: EventBus;

        private state: LCDState;

        constructor() {
        }

        public init(bus: EventBus, state: LCDState, svgEl: SVGSVGElement, otherParams: Map<string>): void {
            this.state = state
            this.bus = bus;
            this.initDom();
            this.updateState();
        }

        initDom() {
            this.element = svg.elt("g");
            this.image = new DOMParser().parseFromString(LCD_PART, "image/svg+xml").querySelector("svg") as SVGSVGElement;
            svg.hydrate(this.image, {
                class: "sim-i2c-lcd", width: LCD_PART_WIDTH, height: LCD_PART_HEIGHT,
            });
            this.screen = this.image.getElementById('ecran') as SVGGElement;
            this.backlight = this.image.getElementById('backlight') as SVGGElement;
            this.backlight.style.fill = "#6e7d6e";
            this.element.appendChild(this.image);
        }

        setChar(column: number, line: number, value: string): void {
            let _case = this.image.getElementById("case"+line+""+column+"_text") as SVGTextElement;
            _case.innerHTML = value.charAt(0);
        }

        public moveToCoord(xy: Coord) {
            translateEl(this.element, [xy[0], xy[1]]);
        }

        public updateTheme() {
        }

        public updateState() {
            for (let line = 0; line < this.state.lines; line++) {
                for (let column = 0; column < this.state.columns; column++) {
                    if(!!this.state.text && !!this.state.text[line] && !!this.state.text[line][column])
                        this.setChar(column, line, this.state.text[line][column]);
                }  
            }
            this.backlight.style.fill = this.state.backLightColor;
        }
    }

    const LCD_PART_WIDTH = 322.79001;
    const LCD_PART_HEIGHT = 147.52467;

    const LCD_PART = `
    <svg
       id="lcd_I2C"
       width="322.76364"
       height="147.52467"
       viewBox="0 0 322.76365 147.52467"
       version="1.1"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:svg="http://www.w3.org/2000/svg">
      <defs
         id="defs2284">
        <style
           id="style2282">
            .cls-textCase{fill:#000;fill-opacity:.8;font-family:monospace;font-weight:100;font-size:24px}.cls-case{fill:#fff;fill-opacity:.1}
          </style>
      </defs>
      <path
         id="rect4820"
         fill="#005679"
         stroke="#ffffff"
         stroke-linecap="round"
         stroke-linejoin="round"
         stroke-width="0.66363"
         d="M 0.331815,0.331815 H 322.43182 V 147.19286 H 0.331815 Z" />
      <path
         id="path132"
         fill="#303030"
         stroke-width="0.9"
         d="m 308.63182,111.29286 c -1,0 -1.9,-0.8 -1.9,-1.8 V 75.992861 c 0,-1 0.9,-1.8 1.9,-1.8 v -26.9 h -0.9 l -2.9,-2.6 v -1 H 18.031815 v 1 l -2.9,2.6 h -1 v 27 h 0.1 c 1,0 1.9,0.8 1.9,1.8 v 33.499999 c 0,1 -0.8,1.8 -1.9,1.8 v 26.9 h 1 l 2.8,2.6 v 1 H 304.83182 v -1 l 2.9,-2.6 h 1 v -27 z" />
      <g
         id="g140"
         transform="matrix(0.95829,0,0,0.88143,-10.168185,14.892861)">
        <path
           id="backlight"
           d="m 319.6,118.3 a 6,6 0 0 1 -6,6 h -269 a 6,6 0 0 1 -6,-6 v -60 a 6,6 0 0 1 6,-6 h 269 a 6,6 0 0 1 6,6 z"
           class="cls-backlight" />
        <g
           id="g138"
           opacity="0.2">
          <path
             id="path136"
             fill="#22420d"
             d="m 319.6,58.3 v 60 z m -275,-6 a 6,6 0 0 0 -6,6 v 60 a 6,6 0 0 0 6,6 H 48 a 6,6 0 0 1 -6,-6 v -58 a 6,6 0 0 1 6,-6 h 270 c -1,-1.1 -2.6,-2 -4.4,-2 z" />
        </g>
      </g>
      <g
         id="g146"
         transform="matrix(0.95829,0,0,0.88143,-10.168185,14.892861)">
        <path
           id="path142"
           fill="#1a1a1a"
           d="m 322,40.5 c 0,-1 -0.8,-2 -1.9,-2 h -282 c -1.1,0 -2,1 -2,2 v 1.1 c 0,1.1 0.9,2 2,2 h 282 c 1,0 2,-0.9 2,-2 v -1 z" />
        <path
           id="path144"
           fill="#424242"
           d="m 321,42.3 c 0,-0.7 -0.6,-1.3 -1.3,-1.3 h -281 c -0.9,0 -1.5,0.6 -1.5,1.3 0,0.7 0.6,1.3 1.4,1.3 h 281 c 0.8,0 1.5,-0.6 1.5,-1.3 z" />
      </g>
      <g
         id="g152"
         transform="matrix(0.95829,0,0,0.88143,-10.168185,14.892861)">
        <path
           id="path148"
           fill="#1a1a1a"
           d="m 322,134 c 0,-1 -0.8,-1.9 -1.9,-1.9 h -282 c -1.1,0 -2,0.9 -2,2 v 1 c 0,1.1 0.9,2 2,2 h 282 c 1,0 2,-0.9 2,-2 v -1 z" />
        <path
           id="path150"
           fill="#424242"
           d="m 321,135.8 c 0,-0.7 -0.6,-1.3 -1.3,-1.3 h -281 c -0.9,0 -1.5,0.6 -1.5,1.3 0,0.8 0.6,1.3 1.4,1.3 h 281 c 0.8,0 1.5,-0.5 1.5,-1.3 z" />
      </g>
      <g
         id="g158"
         fill-opacity="0"
         stroke="#f2f2f2"
         stroke-linecap="round"
         stroke-opacity="0.2"
         stroke-width="0.2"
         transform="matrix(0.95829,0,0,0.88143,-10.168185,14.892861)">
        <path
           id="path154"
           d="m 27,37.4 3.2,-3" />
        <path
           id="path156"
           d="m 30.2,143.3 -3.1,-3.1" />
      </g>
      <g
         id="g164"
         fill-opacity="0"
         stroke="#f2f2f2"
         stroke-linecap="round"
         stroke-opacity="0.2"
         stroke-width="0.2"
         transform="matrix(0.95829,0,0,0.88143,-10.168185,14.892861)">
        <path
           id="path160"
           d="m 332.1,37.4 -3.1,-3" />
        <path
           id="path162"
           d="m 329,143.3 3,-3.1" />
      </g>
      <path
         id="path166"
         fill-opacity="0"
         stroke="#1a1a1a"
         stroke-opacity="0.4"
         stroke-width="1.3"
         d="m 296.53182,119.69286 c 0,2.8 -2.6,5.2 -5.7,5.2 H 33.031815 c -3,0 -5.6,-2.4 -5.6,-5.2 V 66.692861 c 0,-2.8 2.5,-5.2 5.6,-5.2 H 291.03182 c 3,0 5.6,2.4 5.6,5.2 z" />
      <g
         id="ecran"
         transform="matrix(1.02697,0,0,1.04868,-20.268185,0.592861)">
        <path
           id="case10"
           fill="#fff"
           fill-opacity=".1"
           d="m 52.9,88.8 h 14.8 v 24.4 H 52.9 Z"
           class="cls-case" />
        <path
           id="case11"
           fill="#fff"
           fill-opacity=".1"
           d="m 68.7,88.8 h 14.8 v 24.4 H 68.7 Z"
           class="cls-case" />
        <path
           id="case12"
           fill="#fff"
           fill-opacity=".1"
           d="m 84.6,88.8 h 14.8 v 24.4 H 84.5 Z"
           class="cls-case" />
        <path
           id="case13"
           fill="#fff"
           fill-opacity=".1"
           d="m 100.4,88.8 h 14.8 v 24.4 h -14.8 z"
           class="cls-case" />
        <path
           id="case14"
           fill="#fff"
           fill-opacity=".1"
           d="M 116.3,88.8 H 131 v 24.4 h -14.7 z"
           class="cls-case" />
        <path
           id="case15"
           fill="#fff"
           fill-opacity=".1"
           d="m 132,88.8 h 15 v 24.4 h -15 z"
           class="cls-case" />
        <path
           id="case16"
           fill="#fff"
           fill-opacity=".1"
           d="m 148,88.8 h 14.7 v 24.4 H 148 Z"
           class="cls-case" />
        <path
           id="case17"
           fill="#fff"
           fill-opacity=".1"
           d="m 163.8,88.8 h 14.8 v 24.4 h -14.8 z"
           class="cls-case" />
        <path
           id="case18"
           fill="#fff"
           fill-opacity=".1"
           d="m 179.6,88.8 h 14.8 v 24.4 h -14.8 z"
           class="cls-case" />
        <path
           id="case19"
           fill="#fff"
           fill-opacity=".1"
           d="m 195.5,88.8 h 14.7 v 24.4 h -14.7 z"
           class="cls-case" />
        <path
           id="case110"
           fill="#fff"
           fill-opacity=".1"
           d="m 211.3,88.8 h 14.8 v 24.4 h -14.8 z"
           class="cls-case" />
        <path
           id="case111"
           fill="#fff"
           fill-opacity=".1"
           d="M 227.1,88.8 H 242 v 24.4 h -14.8 z"
           class="cls-case" />
        <path
           id="case112"
           fill="#fff"
           fill-opacity=".1"
           d="m 243,88.8 h 14.8 v 24.4 H 243 Z"
           class="cls-case" />
        <path
           id="case113"
           fill="#fff"
           fill-opacity=".1"
           d="m 258.8,88.8 h 14.8 v 24.4 h -14.8 z"
           class="cls-case" />
        <path
           id="case114"
           fill="#fff"
           fill-opacity=".1"
           d="m 274.7,88.8 h 14.7 v 24.4 h -14.7 z"
           class="cls-case" />
        <path
           id="case115"
           fill="#fff"
           fill-opacity=".1"
           d="m 290.5,88.8 h 14.8 v 24.4 h -14.8 z"
           class="cls-case" />
        <text
           id="case10_text"
           x="52.900002"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case11_text"
           x="68.699997"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case12_text"
           x="84.599998"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case13_text"
           x="100.4"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case14_text"
           x="116.3"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case15_text"
           x="132.10001"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case16_text"
           x="147.89999"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case17_text"
           x="163.8"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case18_text"
           x="179.60001"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case19_text"
           x="195.5"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case110_text"
           x="211.3"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case111_text"
           x="227.10001"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case112_text"
           x="243"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case113_text"
           x="258.79999"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case114_text"
           x="274.70001"
           y="112.9"
           class="cls-textCase" />
        <text
           id="case115_text"
           x="290.5"
           y="112.9"
           class="cls-textCase" />
        <path
           id="case00"
           fill="#fff"
           fill-opacity=".1"
           d="M 52.9,63.5 H 67.7 V 87.8 H 52.9 Z"
           class="cls-case" />
        <path
           id="case01"
           fill="#fff"
           fill-opacity=".1"
           d="M 68.7,63.5 H 83.5 V 87.8 H 68.7 Z"
           class="cls-case" />
        <path
           id="case02"
           fill="#fff"
           fill-opacity=".1"
           d="M 84.6,63.5 H 99.4 V 87.8 H 84.5 Z"
           class="cls-case" />
        <path
           id="case03"
           fill="#fff"
           fill-opacity=".1"
           d="m 100.4,63.5 h 14.8 v 24.3 h -14.8 z"
           class="cls-case" />
        <path
           id="case04"
           fill="#fff"
           fill-opacity=".1"
           d="M 116.3,63.5 H 131 v 24.3 h -14.7 z"
           class="cls-case" />
        <path
           id="case05"
           fill="#fff"
           fill-opacity=".1"
           d="m 132,63.5 h 15 v 24.3 h -15 z"
           class="cls-case" />
        <path
           id="case06"
           fill="#fff"
           fill-opacity=".1"
           d="m 148,63.5 h 14.7 V 87.8 H 148 Z"
           class="cls-case" />
        <path
           id="case07"
           fill="#fff"
           fill-opacity=".1"
           d="m 163.8,63.5 h 14.8 v 24.3 h -14.8 z"
           class="cls-case" />
        <path
           id="case08"
           fill="#fff"
           fill-opacity=".1"
           d="m 179.6,63.5 h 14.8 v 24.3 h -14.8 z"
           class="cls-case" />
        <path
           id="case09"
           fill="#fff"
           fill-opacity=".1"
           d="m 195.5,63.5 h 14.7 v 24.3 h -14.7 z"
           class="cls-case" />
        <path
           id="case010"
           fill="#fff"
           fill-opacity=".1"
           d="m 211.3,63.5 h 14.8 v 24.3 h -14.8 z"
           class="cls-case" />
        <path
           id="case011"
           fill="#fff"
           fill-opacity=".1"
           d="M 227.1,63.5 H 242 v 24.3 h -14.8 z"
           class="cls-case" />
        <path
           id="case012"
           fill="#fff"
           fill-opacity=".1"
           d="m 243,63.5 h 14.8 V 87.8 H 243 Z"
           class="cls-case" />
        <path
           id="case013"
           fill="#fff"
           fill-opacity=".1"
           d="m 258.8,63.5 h 14.8 v 24.3 h -14.8 z"
           class="cls-case" />
        <path
           id="case014"
           fill="#fff"
           fill-opacity=".1"
           d="m 274.7,63.5 h 14.7 v 24.3 h -14.7 z"
           class="cls-case" />
        <path
           id="case015"
           fill="#fff"
           fill-opacity=".1"
           d="m 290.5,63.5 h 14.8 v 24.3 h -14.8 z"
           class="cls-case" />
        <text
           id="case00_text"
           x="52.900002"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case01_text"
           x="68.699997"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case02_text"
           x="84.599998"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case03_text"
           x="100.4"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case04_text"
           x="116.3"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case05_text"
           x="132.10001"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case06_text"
           x="147.89999"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case07_text"
           x="163.8"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case08_text"
           x="179.60001"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case09_text"
           x="195.5"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case010_text"
           x="211.3"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case011_text"
           x="227.10001"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case012_text"
           x="243"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case013_text"
           x="258.79999"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case014_text"
           x="274.70001"
           y="87.5"
           class="cls-textCase" />
        <text
           id="case015_text"
           x="290.5"
           y="87.5"
           class="cls-textCase" />
      </g>
      <g
         id="g238"
         fill="#606060"
         transform="matrix(0.95829,0,0,0.88143,-10.168185,14.892861)">
        <path
           id="path234"
           d="m 25.8,109.3 v 30.6 h 0.4 v -30.7 h -0.4 z" />
        <path
           id="path236"
           d="M 26.2,67.5 V 36.7 h -0.4 v 30.7 h 0.4 z" />
      </g>
      <g
         id="g248"
         fill="#212121"
         transform="matrix(0.95829,0,0,0.88143,-10.168185,14.892861)">
        <path
           id="path244"
           d="m 25.5,67.3 h 0.4 V 36.8 h -0.5 v 30.6 z" />
        <path
           id="path246"
           d="M 25.5,109.3 H 25.4 V 140 h 0.5 v -30.6 h -0.4 z" />
      </g>
      <path
         id="path250"
         fill="#212121"
         stroke-width="0.9"
         d="M 18.031815,141.39286 H 304.83182 v 0.5 H 18.031815 Z" />
      <path
         id="path252"
         fill="#606060"
         stroke-width="0.9"
         d="M 18.031815,141.09286 H 304.83182 v 0.3 H 18.031815 Z" />
      <g
         id="g258"
         fill="#212121"
         transform="matrix(0.95829,0,0,0.88143,-10.168185,14.892861)">
        <path
           id="path254"
           d="m 332.7,109.3 h -0.4 v 30.6 h 0.5 v -30.6 z" />
        <path
           id="path256"
           d="M 332.7,67.3 V 36.7 h -0.4 v 30.7 h 0.4 z" />
      </g>
      <g
         id="g264"
         fill="#606060"
         transform="matrix(0.95829,0,0,0.88143,-10.168185,14.892861)">
        <path
           id="path260"
           d="m 332,109.2 v 30.7 h 0.3 v -30.6 l -0.4,-0.1 z" />
        <path
           id="path262"
           d="M 332.3,67.4 V 36.7 h -0.4 v 30.8 z" />
      </g>
      <path
         id="LCD_SDA"
         stroke="#ffffff"
         stroke-linecap="round"
         stroke-linejoin="round"
         stroke-width="0.6"
         d="m 10.031815,2.292861 h 9.7 v 9.7 h -9.7 z" />
      <path
         id="LCD_SCL"
         stroke="#ffffff"
         stroke-linecap="round"
         stroke-linejoin="round"
         stroke-width="0.6"
         d="m 25.031815,2.292861 h 9.7 v 9.7 h -9.7 z" />
      <path
         id="LCD_VCC"
         stroke="#ffffff"
         stroke-linecap="round"
         stroke-linejoin="round"
         stroke-width="0.6"
         d="m 40.031815,2.292861 h 9.7 v 9.7 h -9.7 z" />
      <path
         id="LCD_GND"
         stroke="#ffffff"
         stroke-linecap="round"
         stroke-linejoin="round"
         stroke-width="0.6"
         d="m 55.031815,2.292861 h 9.7 v 9.7 h -9.7 z" />
      <text
         xml:space="preserve"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:11.3386px;line-height:1.25;font-family:monospace;-inkscape-font-specification:'monospace, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
         x="-36.309647"
         y="18.99814"
         id="text5238"
         transform="rotate(-90)"><tspan
           id="tspan5236"
           x="-36.309647"
           y="18.99814"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:11.3386px;font-family:monospace;-inkscape-font-specification:'monospace, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff;fill-opacity:1">GND</tspan></text>
      <text
         xml:space="preserve"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:11.3386px;line-height:1.25;font-family:monospace;-inkscape-font-specification:'monospace, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
         x="-36.016533"
         y="34.038601"
         id="text5238-0"
         transform="rotate(-90)"><tspan
           id="tspan5236-2"
           x="-36.016533"
           y="34.038601"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:11.3386px;font-family:monospace;-inkscape-font-specification:'monospace, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff;fill-opacity:1">VCC</tspan></text>
      <text
         xml:space="preserve"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:11.3386px;line-height:1.25;font-family:monospace;-inkscape-font-specification:'monospace, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
         x="-36.662151"
         y="49.152752"
         id="text5238-0-7"
         transform="rotate(-90)"><tspan
           id="tspan5236-2-5"
           x="-36.662151"
           y="49.152752"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:11.3386px;font-family:monospace;-inkscape-font-specification:'monospace, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff;fill-opacity:1">SDA</tspan></text>
      <text
         xml:space="preserve"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:11.3386px;line-height:1.25;font-family:monospace;-inkscape-font-specification:'monospace, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
         x="-36.33028"
         y="63.903988"
         id="text5238-0-9"
         transform="rotate(-90)"><tspan
           id="tspan5236-2-2"
           x="-36.33028"
           y="63.903988"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:11.3386px;font-family:monospace;-inkscape-font-specification:'monospace, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff;fill-opacity:1">SCL</tspan></text>
    </svg>
`;

}