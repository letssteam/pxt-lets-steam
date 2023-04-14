namespace pxsim.visuals {    
    // For the intructions
    export function mkECMeterSEN0244(xy: Coord = [0, 0]): SVGElAndSize {
        let [x, y] = xy;
        let l = x;
        let t = y;
        let w = SEN0244_PART_WIDTH;
        let h = SEN0244_PART_HEIGHT;
        let img = <SVGGElement>svg.elt("image");
        svg.hydrate(img, {
            class: "sim-SEN0244", x: l, y: t, width: w, height: h,
            href: svg.toDataUri(SEN0244_PART)
        });

        return { el: img, x: l, y: t, w: w, h: h };
    }

    export class ECMeterSEN0244View implements IBoardPart<ECMeterSEN0244State> {
      style: string;
      element: SVGElement;
      defs: SVGElement[];
      image: SVGSVGElement;

      private text_value: SVGTSpanElement;
      
      private part: SVGElAndSize;
      private bus: EventBus;

      private state: ECMeterSEN0244State;

      private timeout_time = SEN0244_DEFAULT_TIMEOUT_VALUE;
      private timeout_id : NodeJS.Timer = null;
      private increment_time = 0;

      constructor() {
      }

      public init(bus: EventBus, state: ECMeterSEN0244State, svgEl: SVGSVGElement, otherParams: Map<string>): void {
         this.state = state;
         this.bus = bus;

         this.state.value = 0;

         this.initDom();
         this.updateState();
      }

      initDom() {
        this.element = svg.elt("g");
        this.image = new DOMParser().parseFromString(SEN0244_PART, "image/svg+xml").querySelector("svg") as SVGSVGElement;

        svg.hydrate(this.image, {
              class: "sim-SEN0244", width: SEN0244_PART_WIDTH, height: SEN0244_PART_HEIGHT,
        });

        this.element.appendChild(this.image);

        let button_minus = this.image.getElementById("minus");
        let button_plus = this.image.getElementById("plus");
        let text_elem = this.image.getElementById("value");
        this.text_value = this.image.getElementById("value").getElementsByTagName("tspan")[0] as SVGTSpanElement;

        // Don't really know why, but the 'text-anchor' is removed during parse/hydrate...
        text_elem.setAttribute("text-anchor", "middle");

        document.addEventListener("mouseup", () => {
          this.increment_time = 0;
          this.timeout_time = SEN0244_DEFAULT_TIMEOUT_VALUE;

          if(this.timeout_id != null){
            clearTimeout(this.timeout_id);
          }

          this.timeout_id = null;
        });

        button_minus.addEventListener("mousedown", () => {
          this.increment_timeout(250, -5);
        });

        button_plus.addEventListener("mousedown", () => {
          this.increment_timeout(250, +5);
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

      private constrain(x: number, min: number, max: number) : number{
        return Math.min( max, Math.max( min, x ) );
      }

      private increment_timeout(timeout: number, incr: number){

        this.increment_time += 1;
        this.state.value = this.constrain(this.state.value + incr, SEN0244_MIN_VALUE, SEN0244_MAX_VALUE);

        if( this.increment_time % 10 == 0){
          timeout *= 0.5;
        }

        this.timeout_id = setTimeout(() => { this.increment_timeout(timeout, incr); }, timeout );
        this.updateState();
      }
    }

    const SEN0244_DEFAULT_TIMEOUT_VALUE = 250;
    const SEN0244_MIN_VALUE = 0;
    const SEN0244_MAX_VALUE = 1000;
  
    const SEN0244_PART_WIDTH = 219.086;
    const SEN0244_PART_HEIGHT = 199.573;

    const SEN0244_PART = `<svg width="219.086" height="199.573" viewBox="0 0 57.966 52.804" version="1.1" id="svg5" xmlns="http://www.w3.org/2000/svg">
    <g id="layer1" transform="translate(-2.077)">
      <path style="fill:none;fill-opacity:1;stroke:#ff4e4e;stroke-width:1.7;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M42.631 12.08c0-.442.215-1.587-2.402-5.014-1.954-2.663-1.816-4.84-1.816-7.065" id="path4419"/>
      <path style="fill:none;stroke:#445dff;stroke-width:1.7;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M45.914 12.136c0-.443-.215-1.588 2.401-5.016 1.919-2.613 1.816-4.79 1.816-7.016" id="path4419-0"/>
      <path style="fill:none;stroke:#000;stroke-width:1.7;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M44.281 12.126V0" id="path5182"/>
      <rect style="fill:#fff;stroke:#000;stroke-width:.0682378;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect1316" width="1.812" height="12.578" x="14.392" y="37.634" ry="0"/>
      <rect style="fill:#fff;stroke:#000;stroke-width:.0682378;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect1316-9" width="1.812" height="12.578" x="19.147" y="37.634" ry="0"/>
      <rect style="fill:#000;stroke:none;stroke-width:.0979521;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke" id="rect846" width="9.797" height="30.463" x="12.777" y="9.91" ry=".532"/>
      <rect style="fill:#000;stroke:none;stroke-width:.0607103;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke" id="rect1154" width="14.165" height="10.19" x="10.593" y="26.497" ry=".672"/>
      <path style="fill:none;stroke:#000;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M17.31 10.507c3.092-18.875 14.644 6.486 20.562 16.063 3.246 4.908 6.403-5.058 6.403-14.556" id="path1557"/>
      <text xml:space="preserve" style="font-size:10.2377px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:2.70872" x="33.886" y="39.226" id="value"><tspan id="tspan10005" style="stroke-width:2.70872" x="46" y="39.226">xxxx</tspan></text>
      <path style="fill:#18d7ea;fill-opacity:.417869;stroke:none;stroke-width:.859023;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers fill stroke" id="rect5092" d="M5.644 20.948h23.147v31.253H5.644z"/>
      <path style="fill:none;stroke:#000;stroke-width:.691028;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M2.423 14.952s3.29-.22 3.29 3.041v34.465h23.305V14.952" id="path2588"/>
      <g id="plus" style="cursor:pointer">
        <circle style="fill:#4d5fff;fill-opacity:1;stroke:#000;stroke-width:.302119;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="handle-3" cx="55.749" cy="46.409" r="4.143"/>
        <text xml:space="preserve" style="font-size:11.4456px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:3.02831;-webkit-user-select: none;user-select: none;" x="52.304" y="49.997" id="text14791"><tspan id="tspan14789" style="stroke-width:3.02831" x="52.304" y="49.997">+</tspan></text>
      </g>
      <g id="minus" style="cursor:pointer">
        <circle style="fill:#fab507;fill-opacity:1;stroke:#000;stroke-width:.302119;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="handle" cx="36.88" cy="46.409" r="4.143"/>
        <text xml:space="preserve" style="font-size:14.7378px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:3.89939;-webkit-user-select: none;user-select: none;" x="24.22" y="63.764" id="text15785" transform="scale(1.28699 .777)"><tspan id="tspan15783" style="stroke-width:3.89939" x="24.22" y="63.764">-</tspan></text>
      </g>
    </g>
  </svg>  
`;
}