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
      private text_unit: SVGTSpanElement;
      
      private part: SVGElAndSize;
      private bus: EventBus;

      private state: ECMeterSEN0244State;

      private handle: SVGCircleElement;
      private ruler: SVGRectElement;

      private is_handle_selected : boolean = false;

      constructor() {
      }

      public init(bus: EventBus, state: ECMeterSEN0244State, svgEl: SVGSVGElement, otherParams: Map<string>): void {
         this.state = state;
         this.bus = bus;

         this.state.value = SEN0244_MIN_VALUE;

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

        this.handle = this.image.getElementById("handle") as SVGCircleElement;
        this.ruler = this.image.getElementById("ruler") as SVGRectElement;

        let text_elem = this.image.getElementById("value");
        this.text_value = this.image.getElementById("value").getElementsByTagName("tspan")[0] as SVGTSpanElement;
        let unit_elem = this.image.getElementById("unit");
        this.text_unit = this.image.getElementById("unit").getElementsByTagName("tspan")[0] as SVGTSpanElement;

        // Don't really know why, but the 'text-anchor' is removed during parse/hydrate...
        text_elem.setAttribute("text-anchor", "middle");
        unit_elem.setAttribute("text-anchor", "middle");

        
        this.handle.addEventListener("mousedown", () => {
          this.is_handle_selected = true;
        })

        document.addEventListener("mouseup", () => {
          this.is_handle_selected = false;
        })

        document.addEventListener("mousemove", (event) => this.moveHandle(event))
      }

      public moveToCoord(xy: Coord) {
         translateEl(this.element, [xy[0], xy[1]]);
      }

      public updateTheme() {
      }

      public updateState() {

        if( this.state.value < 0.001 ){
          this.text_unit.innerHTML = "µS/cm";
          this.text_value.innerHTML = (this.state.value * 1000000).toString(10).substring(0, 6);
        }
        else{
          this.text_unit.innerHTML = "mS/cm";
          this.text_value.innerHTML = (this.state.value * 1000).toString(10).substring(0, 6);
        }
      }

      public moveHandle(event: MouseEvent){
        if( ! this.is_handle_selected ){
          return;
        }

        let point: SVGPoint = this.image.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        point = point.matrixTransform( this.image.getScreenCTM().inverse());

        let offset = point.y - this.ruler.y.baseVal.value - this.ruler.height.baseVal.value;
        offset = Math.max(-this.ruler.height.baseVal.value, Math.min(0, offset));

        this.handle.setAttribute("transform", `translate(0 ${offset})`);

        let percent = Math.abs(offset) / this.ruler.height.baseVal.value;
        this.state.value = (SEN0244_MAX_VALUE - SEN0244_MIN_VALUE) * percent + SEN0244_MIN_VALUE

        this.updateState();
      }

    }

    const SEN0244_MIN_VALUE = 0.00000017;
    const SEN0244_MAX_VALUE = 0.08005805;
  
    const SEN0244_PART_WIDTH = 219.086;
    const SEN0244_PART_HEIGHT = 199.573;

    const SEN0244_PART = `<svg width="219.086" height="199.573" viewBox="0 0 57.966 52.804" version="1.1" id="svg5" xmlns="http://www.w3.org/2000/svg">
    <g id="layer1" transform="translate(-2.077)">
      <rect style="fill:#18daec;fill-opacity:.85000002;stroke:#000;stroke-width:.13229167;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect34805" width="24.051" height="10.598" x="27.209" y="30.791" ry="1.225"/>
      <path style="fill:none;fill-opacity:1;stroke:#ff4e4e;stroke-width:1.7;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M40.514 12.08c0-.442.215-1.587-2.401-5.014-1.955-2.663-1.816-4.84-1.816-7.065" id="path4419"/>
      <path style="fill:none;stroke:#445dff;stroke-width:1.7;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M43.797 12.136c0-.443-.215-1.588 2.402-5.016 1.918-2.613 1.816-4.79 1.816-7.016" id="path4419-0"/>
      <path style="fill:none;stroke:#000;stroke-width:1.7;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M42.165 12.126V0" id="path5182"/>
      <g id="g33525">
        <rect style="fill:#fff;stroke:#000;stroke-width:.0682378;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect1316" width="1.812" height="12.578" x="12.275" y="37.634" ry="0"/>
        <rect style="fill:#fff;stroke:#000;stroke-width:.0682378;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect1316-9" width="1.812" height="12.578" x="17.03" y="37.634" ry="0"/>
        <rect style="fill:#000;stroke:none;stroke-width:.0979521;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke" id="rect846" width="9.797" height="30.463" x="10.66" y="9.91" ry=".532"/>
        <rect style="fill:#000;stroke:none;stroke-width:.0607103;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke" id="rect1154" width="14.165" height="10.19" x="8.476" y="26.497" ry=".672"/>
      </g>
      <path style="fill:none;stroke:#000;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M15.193 11.258c-.181-5.124 1.102-8.4 5.343-8.426 4.715-.03 9.592 10.23 13.63 17.129 4.979 6.486 7.992 1.551 7.992-7.947" id="path1557"/>
      <text xml:space="preserve" style="font-size:6.35px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:2.70872" x="39.433" y="35.667" id="value"><tspan id="tspan10005" style="font-size:6.35px;text-align:center;text-anchor:middle;stroke-width:2.70872;user-select:none" x="39.433" y="35.667">xxxxxx</tspan></text>
      <text xml:space="preserve" style="font-size:4.23333px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:1.42282" x="39.613" y="39.846" id="unit"><tspan id="tspan10005-8" style="font-size:4.23333px;text-align:center;text-anchor:middle;stroke-width:1.42282;user-select:none" x="39.613" y="39.846">xx/cm</tspan></text>
      <rect style="fill:#000;stroke:#000;stroke-width:.185128;stroke-linecap:round;paint-order:markers fill stroke" id="ruler" width=".609" height="44.81" x="55.061" y="4.001" ry="0"/>
      <circle style="fill:#fab507;fill-opacity:1;stroke:#000;stroke-width:.228352;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke;cursor:pointer" id="handle" cx="55.396" cy="48.43" r="3.132"/>
      <g id="g33519">
        <path style="fill:#18d7ea;fill-opacity:.417869;stroke:none;stroke-width:.817814;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers fill stroke" id="rect5092" d="M5.323 20.937h20.961v31.281H5.323z"/>
        <path style="fill:none;stroke:#000;stroke-width:.657878;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M2.406 14.935s2.98-.22 2.98 3.044v34.496H26.49v-37.54" id="path2588"/>
      </g>
    </g>
  </svg>`;
}