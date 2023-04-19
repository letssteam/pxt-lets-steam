namespace pxsim.visuals {    
    // For the intructions
    export function mkINA219(xy: Coord = [0, 0]): SVGElAndSize {
        let [x, y] = xy;
        let l = x;
        let t = y;
        let w = INA219_PART_WIDTH;
        let h = INA219_PART_HEIGHT;
        let img = <SVGGElement>svg.elt("image");
        svg.hydrate(img, {
            class: "sim-INA219", x: l, y: t, width: w, height: h,
            href: svg.toDataUri(INA219_PART)
        });

        return { el: img, x: l, y: t, w: w, h: h };
    }

    const enum INA219_Handle{
      VOLTAGE = 0,
      CURRENT = 1
    }

    export class INA219View implements IBoardPart<INA219State> {
      style: string;
      element: SVGElement;
      defs: SVGElement[];
      image: SVGSVGElement;

      private text_value_current: SVGTSpanElement;
      private text_value_voltage: SVGTSpanElement;

      private handle_voltage : SVGGElement;
      private handle_current : SVGGElement;
      private ruler_voltage : SVGRectElement;
      private ruler_current : SVGRectElement;

      private part: SVGElAndSize;
      private bus: EventBus;

      private state: INA219State;

      private handle_selected : INA219_Handle = null;
      private last_y : number = 0;

      public init(bus: EventBus, state: INA219State, svgEl: SVGSVGElement, otherParams: Map<string>): void {
         this.state = state;
         this.bus = bus;

         this.state.current = 0;
         this.state.voltage = 0;

         this.initDom();
         this.updateState();
      }

      initDom() {
        this.element = svg.elt("g");
        this.image = new DOMParser().parseFromString(INA219_PART, "image/svg+xml").querySelector("svg") as SVGSVGElement;

        svg.hydrate(this.image, {
              class: "sim-INA219", width: INA219_PART_WIDTH, height: INA219_PART_HEIGHT,
        });

        this.element.appendChild(this.image);

        let text_elem_current = this.image.getElementById("value_A") as SVGTextElement;
        let text_elem_voltage = this.image.getElementById("value_V") as SVGTextElement;

        this.text_value_current = text_elem_current.getElementsByTagName("tspan")[0] as SVGTSpanElement;
        this.text_value_voltage = text_elem_voltage.getElementsByTagName("tspan")[0] as SVGTSpanElement;

        this.ruler_current = this.image.getElementById("ruler_A") as SVGRectElement;
        this.ruler_voltage = this.image.getElementById("ruler_V") as SVGRectElement;
        
        this.handle_current = this.image.getElementById("handle_A") as SVGGElement;
        this.handle_voltage = this.image.getElementById("handle_V") as SVGGElement;

        // Don't really know why, but the 'text-anchor' is removed during parse/hydrate...
        text_elem_current.setAttribute("text-anchor", "middle");
        text_elem_voltage.setAttribute("text-anchor", "middle");

        this.handle_current.addEventListener("mousedown", () => {
          this.handle_selected = INA219_Handle.CURRENT;
          this.last_y = 0;
        });

        this.handle_voltage.addEventListener("mousedown", () => {
          this.handle_selected = INA219_Handle.VOLTAGE;
          this.last_y = 0;
        });

        document.addEventListener("mouseup", () => {
          this.handle_selected = null;
          this.last_y = 0;
        });

        document.addEventListener("mousemove", (event) => this.moveHandle(event) );
      }

      public moveToCoord(xy: Coord) {
         translateEl(this.element, [xy[0], xy[1]]);
      }

      public updateTheme() {
      }

      public updateState() {
        this.text_value_voltage.innerHTML = this.state.voltage.toString(10).substring(0, 4) + " V";
        this.text_value_current.innerHTML = this.state.current.toString(10).substring(0, 4) + " A";
      }

      public moveHandle(event: MouseEvent){
        if( this.handle_selected == null ){
          return;
        }

        let ruler : SVGRectElement;
        let handle : SVGGElement;
        let setStateValue : (value: number) => void; // value : [0, 1]

        switch(this.handle_selected){
          case INA219_Handle.CURRENT:
            ruler = this.ruler_current;
            handle = this.handle_current;
            setStateValue = (value: number) => { this.state.current = value * 3.2; }
            break;

          case INA219_Handle.VOLTAGE:
            ruler = this.ruler_voltage;
            handle = this.handle_voltage;
            setStateValue = (value: number) => { this.state.voltage = value * 26; }
            break;

          default:
            console.error("Unknonw enum value");
            return;
        }

        // let currentTranslate = this.parseTranslate(handle);
        let point: SVGPoint = this.image.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        point = point.matrixTransform( this.image.getScreenCTM().inverse());

        let offset = point.y - ruler.y.baseVal.value - ruler.height.baseVal.value;
        offset = Math.max(-ruler.height.baseVal.value, Math.min(0, offset));

        handle.setAttribute("transform", `translate(${/*currentTranslate[0]*/0} ${offset})`);
        
        setStateValue( Math.abs(offset) / ruler.height.baseVal.value );

        this.updateState();
      }


      // private parseTranslate(elem: SVGGElement) : number[]{
      //   let attr = elem.getAttribute("transform");

      //   if( attr != null){
      //     var match = attr.match(/translate\((-?[0-9]*\.?[0-9]*) (-?[0-9]*\.?[0-9]*)\)/);

      //     if( match != null && match.length >= 3 ){
      //       return [ parseFloat(match[1]), parseFloat(match[2]) ];
      //     }
      //   }

      //   return [0, 0];
      // }
   }

    const INA219_PART_WIDTH = 262.619;
    const INA219_PART_HEIGHT = 199.877;
    
    const INA219_PART = `<svg width="262.619" height="199.877" viewBox="0 0 69.485 52.884" version="1.1" id="svg75155" xmlns="http://www.w3.org/2000/svg">
    <g id="layer1">
      <rect style="fill:#000;fill-opacity:1;stroke:#000;stroke-width:.209466;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="ruler_V" width=".752" height="40.41" x="65.177" y="4.734" ry=".244"/>
      <path id="rect75238" style="fill:#1b5991;fill-opacity:1;stroke:none;stroke-width:.495029;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke" d="M10.534 2.546c-1.06 0-1.915 1.024-1.915 2.295v45.748c0 1.272.854 2.295 1.915 2.295h48.668c1.061 0 1.915-1.023 1.915-2.295V4.841c0-1.271-.854-2.295-1.915-2.295z"/>
      <rect style="fill:#000;fill-opacity:1;stroke:#000;stroke-width:.209466;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="ruler_A" width=".752" height="40.41" x="3.556" y="4.734" ry=".244"/>
      <rect style="fill:#000;fill-opacity:1;stroke:none;stroke-width:.468572;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke" id="rect77567" width="31.635" height="4.462" x="18.853" y="3.234" ry="0"/>
      <path style="fill:none;fill-opacity:1;stroke:#a6a6a6;stroke-width:.849237;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M21.871 5.644V.424" id="path77850"/>
      <path style="fill:none;fill-opacity:1;stroke:#a6a6a6;stroke-width:.849237;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M27.007 5.644V.424" id="path77850-7"/>
      <path style="fill:none;fill-opacity:1;stroke:#a6a6a6;stroke-width:.849237;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M32.142 5.644V.424" id="path77850-6"/>
      <path style="fill:none;fill-opacity:1;stroke:#a6a6a6;stroke-width:.849237;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M37.277 5.644V.424" id="path77850-4"/>
      <path style="fill:none;fill-opacity:1;stroke:#a6a6a6;stroke-width:.849237;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M42.413 5.644V.424" id="path77850-3"/>
      <path style="fill:none;fill-opacity:1;stroke:#a6a6a6;stroke-width:.849237;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M47.548 5.644V.424" id="path77850-0"/>
      <rect style="fill:#898989;fill-opacity:1;stroke:#000;stroke-width:.177409;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect78900" width="7.872" height="3.465" x="15.365" y="17.937" ry="0"/>
      <rect style="fill:#898989;fill-opacity:1;stroke:#000;stroke-width:.177409;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect78900-9" width="3.354" height="7.62" x="44.082" y="17.674" ry="0"/>
      <rect style="fill:#898989;fill-opacity:1;stroke:#000;stroke-width:.177409;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect78900-9-2" width="3.354" height="7.62" x="48.38" y="17.674" ry="0"/>
      <rect style="fill:#898989;fill-opacity:1;stroke:#000;stroke-width:.177409;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect78900-9-5" width="3.354" height="7.62" x="52.678" y="17.674" ry="0"/>
      <rect style="fill:#898989;fill-opacity:1;stroke:#000;stroke-width:.177409;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect78900-0" width="7.872" height="3.465" x="15.365" y="24.021" ry="0"/>
      <rect style="fill:#898989;fill-opacity:1;stroke:#000;stroke-width:.165033;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect78900-0-4" width="12.652" height="5.388" x="28.384" y="26.439" ry="0"/>
      <path style="fill:#000;fill-opacity:1;stroke:none;stroke-width:.465307;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect80352" d="M28.635 17.682h12.148v7.448H28.635z"/>
      <path style="fill:#389509;fill-opacity:1;stroke:#000;stroke-width:.183488;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect80578" d="M26.887 41.297h17.169v11.012H26.887z"/>
      <path style="fill:none;stroke:#000;stroke-width:.0917431px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M26.917 51.064h17.104" id="path81395"/>
      <path style="fill:none;stroke:#000;stroke-width:.0917431px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M35.471 51.06v-9.693" id="path81510"/>
      <circle style="fill:#a3a3a3;fill-opacity:1;stroke:#000;stroke-width:.0917431;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="path81716" cx="31.126" cy="46.069" r="3.269"/>
      <circle style="fill:#a3a3a3;fill-opacity:1;stroke:#000;stroke-width:.0917431;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="path81716-0" cx="39.83" cy="46.069" r="3.269"/>
      <path style="fill:none;stroke:#000;stroke-width:.733948;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M29.046 46.07h4.161" id="path83321"/>
      <path style="fill:none;stroke:#000;stroke-width:.733948;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M37.749 46.07h4.161" id="path83321-5"/>
      <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:4.04954px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:sans-serif;text-align:center;text-anchor:middle;fill:#fff;stroke-width:.121486" x="21.766" y="51.26" id="text84549"><tspan id="tspan84547" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-family:sans-serif;-inkscape-font-specification:sans-serif;fill:#fff;stroke-width:.121486" x="21.766" y="51.26">Vin+</tspan></text>
      <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:4.04954px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:sans-serif;text-align:center;text-anchor:middle;fill:#fff;stroke-width:.121486" x="49.123" y="51.196" id="text84549-9"><tspan id="tspan84547-4" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-family:sans-serif;-inkscape-font-specification:sans-serif;fill:#fff;stroke-width:.121486" x="49.123" y="51.196">Vin-</tspan></text>
      <text xml:space="preserve" style="font-size:2.90819px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:start;text-anchor:start;stroke-width:.145408" x="18.761" y="10.593" id="text100149"><tspan id="tspan100147" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:2.90819px;font-family:sans-serif;-inkscape-font-specification:sans-serif;text-align:start;text-anchor:start;fill:#fff;stroke-width:.145408" x="18.761" y="10.593">Vin+</tspan></text>
      <text xml:space="preserve" style="font-size:2.90819px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:start;text-anchor:start;stroke-width:.145408" x="39.531" y="10.572" id="text100149-6"><tspan id="tspan100147-5" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:2.90819px;font-family:sans-serif;-inkscape-font-specification:sans-serif;text-align:start;text-anchor:start;fill:#fff;stroke-width:.145408" x="39.531" y="10.572">Gnd</tspan></text>
      <text xml:space="preserve" style="font-size:2.90819px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:start;text-anchor:start;stroke-width:.145408" x="29.203" y="10.572" id="text100149-2"><tspan id="tspan100147-6" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:2.90819px;font-family:sans-serif;-inkscape-font-specification:sans-serif;text-align:start;text-anchor:start;fill:#fff;stroke-width:.145408" x="29.203" y="10.572">Sda</tspan></text>
      <text xml:space="preserve" style="font-size:2.90819px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:start;text-anchor:start;stroke-width:.145408" x="35.414" y="14.81" id="text100149-4"><tspan id="tspan100147-7" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:2.90819px;font-family:sans-serif;-inkscape-font-specification:sans-serif;text-align:start;text-anchor:start;fill:#fff;stroke-width:.145408" x="35.414" y="14.81">Scl</tspan></text>
      <text xml:space="preserve" style="font-size:2.90819px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:start;text-anchor:start;stroke-width:.145408" x="24.257" y="14.83" id="text100149-4-5"><tspan id="tspan100147-7-8" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:2.90819px;font-family:sans-serif;-inkscape-font-specification:sans-serif;text-align:start;text-anchor:start;fill:#fff;stroke-width:.145408" x="24.257" y="14.83">Vin-</tspan></text>
      <text xml:space="preserve" style="font-size:2.90819px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:start;text-anchor:start;stroke-width:.145408" x="44.785" y="14.765" id="text100149-4-7"><tspan id="tspan100147-7-9" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:2.90819px;font-family:sans-serif;-inkscape-font-specification:sans-serif;text-align:start;text-anchor:start;fill:#fff;stroke-width:.145408" x="44.785" y="14.765">Vcc</tspan></text>
      <text xml:space="preserve" style="font-size:6.70308px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:center;text-anchor:middle;fill:#fff;stroke:#000;stroke-width:.145408;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" x="19.91" y="38.781" id="value_A"><tspan id="tspan129140" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-family:sans-serif;-inkscape-font-specification:sans-serif;fill:#fff;stroke:#000;stroke-width:.145408;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" x="19.91" y="38.781">xx.x A</tspan></text>
      <text xml:space="preserve" style="font-size:6.70308px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:center;text-anchor:middle;fill:#fff;stroke:#000;stroke-width:.145408;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" x="49.337" y="38.962" id="value_V"><tspan id="tspan129140-8" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-family:sans-serif;-inkscape-font-specification:sans-serif;fill:#fff;stroke:#000;stroke-width:.145408;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" x="49.337" y="38.962">xx.x V</tspan></text>
      <g id="handle_A" style="cursor:pointer;user-select:none">
        <circle style="fill:#b4cbf0;fill-opacity:1;stroke:#000;stroke-width:.109915;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" cx="3.932" cy="45.159" r="3.877" id="circle98365"/>
        <text xml:space="preserve" style="font-size:6.78574px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:center;text-anchor:middle;stroke-width:.145409" x="3.932" y="47.632" id="text89271"><tspan id="tspan89269" style="font-size:6.78574px;stroke-width:.145409" x="3.932" y="47.632">A</tspan></text>
      </g>
      <g id="handle_V" style="cursor:pointer;user-select:none">
        <circle style="fill:#b4f0bd;fill-opacity:1;stroke:#000;stroke-width:.109915;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" cx="65.553" cy="45.143" r="3.877" id="circle98371"/>
        <text xml:space="preserve" style="font-size:6.78574px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;text-align:center;text-anchor:middle;stroke-width:.145409" x="65.553" y="47.617" id="text92509"><tspan id="tspan92507" style="font-size:6.78574px;stroke-width:.145409" x="65.553" y="47.617">V</tspan></text>
      </g>
    </g>
  </svg>`;
}