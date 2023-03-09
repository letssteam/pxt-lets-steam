namespace pxsim.visuals {    
    // For the intructions
    export function mkSoilHygrometerPart(xy: Coord = [0, 0]): SVGElAndSize {
        let [x, y] = xy;
        let l = x;
        let t = y;
        let w = SOIL_HUM_PART_WIDTH;
        let h = SOIL_HUM_PART_HEIGHT;
        let img = <SVGGElement>svg.elt("image");
        svg.hydrate(img, {
            class: "sim-soil-hygrometer", x: l, y: t, width: w, height: h,
            href: svg.toDataUri(SOIL_HUM_PART)
        });
        console.log(SOIL_HUM_PART);

        return { el: img, x: l, y: t, w: w, h: h };
    }

    export class SoilHygrometerView implements IBoardPart<SoilHygrometerState> {
      style: string;
      element: SVGElement;
      defs: SVGElement[];
      image: SVGSVGElement;

      private text_value: SVGTextElement;
      private part: SVGElAndSize;
      private bus: EventBus;

      private state: SoilHygrometerState;

      private interval_btn : NodeJS.Timer;
      private interval_counter : number;

      static readonly INTERVAL_MS : number = 125;
      static readonly STEP_VALUE : number = 5;

      constructor() {
      }

      public init(bus: EventBus, state: SoilHygrometerState, svgEl: SVGSVGElement, otherParams: Map<string>): void {
         this.state = soilHygrometerState();
         this.bus = bus;
         
         this.state.value = 512;

         this.initDom();
         this.updateState();
      }

      initDom() {
         this.element = svg.elt("g");
         this.image = new DOMParser().parseFromString(SOIL_HUM_PART, "image/svg+xml").querySelector("svg") as SVGSVGElement;
         svg.hydrate(this.image, {
               class: "sim-soil-hygrometer", width: SOIL_HUM_PART_WIDTH, height: SOIL_HUM_PART_HEIGHT,
         });

         console.log(this.image);

         this.element.appendChild(this.image);

         this.text_value = this.image.getElementById("value") as SVGTextElement;

         // Don't really know why, but the 'text-anchor' and the x=50% are change during parse/hydrate functions...
         this.text_value.setAttribute("text-anchor", "middle");
         this.text_value.setAttribute("x", "50%");

         let minus_btn = this.image.getElementById("minus");
         let plus_btn = this.image.getElementById("plus");

         minus_btn.addEventListener("mousedown", () => {
            this.interval_btn = setInterval(() => {
               this.intervalSetValue(-SoilHygrometerView.STEP_VALUE)
            }, SoilHygrometerView.INTERVAL_MS);

            this.safeAddValue(-SoilHygrometerView.STEP_VALUE);
            this.interval_counter = 0;
            this.updateState();
         });

         minus_btn.addEventListener("mouseup", () => {
            clearInterval(this.interval_btn);
         });

         minus_btn.addEventListener("mouseleave", () => {
            clearInterval(this.interval_btn);
         });


         plus_btn.addEventListener("mousedown", () => {
            this.interval_btn = setInterval(() => {
               this.intervalSetValue(SoilHygrometerView.STEP_VALUE)
            }, SoilHygrometerView.INTERVAL_MS);

            this.safeAddValue(SoilHygrometerView.STEP_VALUE);
            this.interval_counter = 0;
            this.updateState();
         });

         plus_btn.addEventListener("mouseup", () => {
            clearInterval(this.interval_btn);
         });

         plus_btn.addEventListener("mouseleave", () => {
            clearInterval(this.interval_btn);
         });

      }

      public moveToCoord(xy: Coord) {
         translateEl(this.element, [xy[0], xy[1]]);
      }

      public updateTheme() {
      }

      public updateState() {
         this.text_value.innerHTML = this.state.value.toString(10);
      }

      private safeAddValue(amount: number){
         this.state.value = Math.min(1024, Math.max(0, this.state.value + amount) );
      }

      private intervalSetValue(amount: number){
         this.interval_counter += 1;

         this.safeAddValue(amount);

         if( this.interval_counter > (1000 / SoilHygrometerView.INTERVAL_MS) ){
            this.safeAddValue(amount);
         }

         if( this.interval_counter > (2000 / SoilHygrometerView.INTERVAL_MS) ){
            this.safeAddValue(amount);
         }

         this.updateState();
      }
    }

    const SOIL_HUM_PART_WIDTH = 209.811; // 29.973 * 7
    const SOIL_HUM_PART_HEIGHT = 595.812; // 85.116 * 7

    const SOIL_HUM_PART = `
    <svg width="113.284" height="302.099" viewBox="0 0 29.973 79.93" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(.011 -5.263)">
      <path style="fill:#da5938;fill-opacity:1;stroke:#000;stroke-width:.208736;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M12.295.094C11.579.107.117.53.117 14.09v265.047l17.1 22.482 16.209-22.482V78.78s.026-18.949 23.662-18.949c23.365 0 23.662 18.95 23.662 18.95v200.355l16.209 22.482 16.209-22.482-.022-265.922c0-13.12-10.681-13.12-10.681-13.12h-90.17zm35.193 5.318a2.733 2.733 0 0 1 2.735 2.734 2.733 2.733 0 0 1-2.735 2.733 2.733 2.733 0 0 1-2.732-2.733 2.733 2.733 0 0 1 2.732-2.734zm9.219 0a2.733 2.733 0 0 1 2.734 2.734 2.733 2.733 0 0 1-2.734 2.733 2.733 2.733 0 0 1-2.732-2.733 2.733 2.733 0 0 1 2.732-2.734zm9.219 0a2.733 2.733 0 0 1 2.734 2.734 2.733 2.733 0 0 1-2.734 2.733 2.733 2.733 0 0 1-2.733-2.733 2.733 2.733 0 0 1 2.733-2.734z" transform="translate(-.011 5.263) scale(.26458)"/>
      <path style="fill:#969696;fill-opacity:1;stroke:none;stroke-width:.146;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M.34 26.068v53.467l4.204 5.531 3.989-5.531V26.037m13.123.023v53.475l3.986 5.531 3.983-5.531.01-53.505"/>
      <rect style="fill:none;stroke:#000;stroke-width:.100899;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers fill stroke" width="2.439" height="2.439" x="11.334" y="6.199" ry="0" rx="0"/>
      <rect style="fill:none;stroke:#000;stroke-width:.100899;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers fill stroke" width="2.439" height="2.439" x="13.773" y="6.199" ry="0" rx="0"/>
      <rect style="fill:none;stroke:#000;stroke-width:.100899;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers fill stroke" width="2.439" height="2.439" x="16.212" y="6.199" ry="0" rx="0"/>
      <text xml:space="preserve" style="font-size:2.23952px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:.59254" x="11.654" y="10.625"><tspan style="stroke-width:.59254" x="11.654" y="10.625">S + -</tspan></text>
      <circle style="fill:none;stroke:#fac96f;stroke-width:.553846;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;paint-order:markers fill stroke" cx="12.554" cy="7.418" r=".723"/>
      <circle style="fill:none;stroke:#fac96f;stroke-width:.553844;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;paint-order:markers fill stroke" cx="14.993" cy="7.418" r=".723"/>
      <circle style="fill:none;stroke:#fac96f;stroke-width:.553846;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;paint-order:markers fill stroke" cx="17.432" cy="7.418" r=".723"/>
      <text id="value" xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:6.52928px;line-height:1.25;font-family:monospace;-inkscape-font-specification:&quot;monospace, Normal&quot;;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke:none;stroke-width:.158383;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" x="7.114" y="17.14"><tspan style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:6.52928px;font-family:monospace;-inkscape-font-specification:&quot;monospace, Normal&quot;;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke:none;stroke-width:.158383;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" x="50%" y="17.14" text-anchor="middle">xxx</tspan></text>
      <g style="cursor:pointer" id="minus">
        <circle style="fill:#ddea18;stroke:#fff;stroke-width:.352998;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;paint-order:markers fill stroke;fill-opacity:1" cx="3.864" cy="15.354" r="1.773"/>
        <text xml:space="preserve" style="font-size:.999999px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:.264583" x="1.455" y="17.546"><tspan style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:7.99998px;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono, Normal&quot;;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:.264583" x="1.455" y="17.546">-</tspan></text>
      </g>
      <g style="cursor:pointer" id="plus">
        <circle style="fill:#18d7ea;fill-opacity:1;stroke:#fff;stroke-width:.352998;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;paint-order:markers fill stroke" cx="25.98" cy="15.354" r="1.773"/>
        <text xml:space="preserve" style="font-size:.646493px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:.171051" x="24.423" y="16.976"><tspan style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:5.17194px;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono, Normal&quot;;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:.171051" x="24.423" y="16.976">+</tspan></text>
      </g>
    </g>
  </svg>
`;

}