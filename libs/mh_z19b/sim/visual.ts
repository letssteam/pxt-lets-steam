namespace pxsim.visuals {    
    // For the intructions
    export function mkMHZ19B(xy: Coord = [0, 0]): SVGElAndSize {
        let [x, y] = xy;
        let l = x;
        let t = y;
        let w = MHZ19B_PART_WIDTH;
        let h = MHZ19B_PART_HEIGHT;
        let img = <SVGGElement>svg.elt("image");
        svg.hydrate(img, {
            class: "sim-MHZ19B", x: l, y: t, width: w, height: h,
            href: svg.toDataUri(MHZ19B_PART)
        });

        return { el: img, x: l, y: t, w: w, h: h };
    }

    export class MHZ19BView implements IBoardPart<MHZ19BState> {
      style: string;
      element: SVGElement;
      defs: SVGElement[];
      image: SVGSVGElement;

      private text_value: SVGTextElement;
      private handle : SVGGElement;
      private ruler : SVGRectElement;

      private circle : SVGCircleElement;

      private parent_svg : SVGSVGElement;
      private part: SVGElAndSize;
      private bus: EventBus;

      private state: MHZ19BState;

      private is_handle_selected : boolean = false;
      private last_y : number = 0;

      constructor() {
      }

      public init(bus: EventBus, state: MHZ19BState, svgEl: SVGSVGElement, otherParams: Map<string>): void {
         this.state = state;
         this.bus = bus;
         this.parent_svg = svgEl;

         this.state.value = 0;

         this.initDom();
         this.updateState();
      }

      initDom() {
         this.element = svg.elt("g");
         this.image = new DOMParser().parseFromString(MHZ19B_PART, "image/svg+xml").querySelector("svg") as SVGSVGElement;

         svg.hydrate(this.image, {
               class: "sim-MHZ19B", width: MHZ19B_PART_WIDTH, height: MHZ19B_PART_HEIGHT,
         });

         this.element.appendChild(this.image);

         this.text_value = this.image.getElementById("value") as SVGTextElement;
         this.handle = this.image.getElementById("handle") as SVGGElement;
         this.ruler = this.image.getElementById("ruler") as SVGRectElement;

         // Don't really know why, but the 'text-anchor' is removed during parse/hydrate...
         this.text_value.setAttribute("text-anchor", "middle");

         this.handle.addEventListener("mousedown", () => {
          this.is_handle_selected = true;
          this.last_y = 0;
         })

         document.addEventListener("mouseup", () => {
          this.is_handle_selected = false;
          this.last_y = 0;
         })

         document.addEventListener("mousemove", (event) => this.moveHandle(event) );
      }

      public moveToCoord(xy: Coord) {
         translateEl(this.element, [xy[0], xy[1]]);
      }

      public updateTheme() {
      }

      public updateState() {
         this.text_value.innerHTML = this.state.value.toString(10);
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
        this.state.value = Math.round(5000 * (-1 * offset) / this.ruler.height.baseVal.value);
        this.updateState();
      }

      public extractYFromTranslate(str: string) : number{

        if( str == null ){
          return 0;
        }

        let result = str.match(/translate\((\-?[0-9]+\.?[0-9]*) (\-?[0-9]+\.?[0-9]*)\)/g);

        if( result == null || result.length == 0){
          return 0;
        }

        let values = result[0].replace(/[A-Za-z\(\)]+/g, "").split(" ");

        if( values.length < 2  ){
          return 0;
        }

        return parseFloat( values[1] );
      }
   }

    const MHZ19B_PART_WIDTH = 196.28; //98.14*2;
    const MHZ19B_PART_HEIGHT = 253.446; //126.723*2;

    const MHZ19B_PART = `<svg width="98.14" height="126.723" viewBox="0 0 25.966 33.529" version="1.1" id="svg5" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
    <defs id="defs2">
      <linearGradient id="linearGradient20926">
        <stop style="stop-color:#f8a720;stop-opacity:1" offset="0" id="stop20922"/>
        <stop style="stop-color:#12c41d;stop-opacity:1" offset="1" id="stop20924"/>
      </linearGradient>
      <linearGradient xlink:href="#linearGradient20926" id="linearGradient20932" x1="89.497" y1="91.757" x2="89.422" y2="115.298" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.00112 0 0 .94852 -65.899 -77.948)"/>
    </defs>
    <g id="layer1">
      <g id="g34682">
        <rect style="fill:url(#linearGradient20932);fill-opacity:1;stroke:#000;stroke-width:.0974468;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="ruler" width="1.105" height="29.399" x="23.282" y="1.963" ry=".523"/>
        <g id="handle">
          <circle style="fill:#636363;fill-opacity:1;stroke:#000;stroke-width:.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="path2812-5" cx="-31.035" cy="23.835" r="2.081" transform="rotate(-90)"/>
          <rect style="fill:#fff;fill-opacity:1;stroke:none;stroke-width:.127221;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect21476-0" width="2.744" height=".21" x="22.428" y="30.27" ry=".057" rx=".049"/>
          <rect style="fill:#fff;fill-opacity:1;stroke:none;stroke-width:.127221;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect21476-0-5" width="2.744" height=".21" x="22.428" y="30.93" ry=".057" rx=".049"/>
          <rect style="fill:#fff;fill-opacity:1;stroke:none;stroke-width:.127221;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect21476-0-9" width="2.744" height=".21" x="22.428" y="31.589" ry=".057" rx=".049"/>
        </g>
        <g id="g34646">
          <path id="rect15026" style="fill:#009100;fill-opacity:1;stroke:none;stroke-width:.397002;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M2.675 3h13V0h-13Zm1.89-1.5a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0zm2.54 0a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0zm2.54 0a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0zm2.54 0a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0z"/>
          <path id="path13191-89" style="fill:#decd04;fill-opacity:1;stroke:none;stroke-width:.200283;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M4.565 1.5a.8.8 0 0 0 .8.8.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8Zm.4 0a.4.4 0 0 1 .4-.4.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4z"/>
          <path id="path13191-8-6" style="fill:#decd04;fill-opacity:1;stroke:none;stroke-width:.200283;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M7.105 1.5a.8.8 0 0 0 .8.8.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8Zm.4 0a.4.4 0 0 1 .4-.4.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4z"/>
          <path id="path13191-83-4" style="fill:#decd04;fill-opacity:1;stroke:none;stroke-width:.200283;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M9.645 1.5a.8.8 0 0 0 .8.8.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8Zm.4 0a.4.4 0 0 1 .4-.4.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4z"/>
          <path id="path13191-1-3" style="fill:#decd04;fill-opacity:1;stroke:none;stroke-width:.200283;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M12.185 1.5a.8.8 0 0 0 .8.8.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8Zm.4 0a.4.4 0 0 1 .4-.4.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4z"/>
        </g>
        <rect style="fill:#fbc42f;fill-opacity:1;stroke:none;stroke-width:.352999;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke" id="rect846" width="26.5" height="19.5" x="-29.475" y="0" ry="0" transform="rotate(-90)"/>
        <path style="fill:#fffbf4;fill-opacity:1;stroke:none;stroke-width:.352999;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke" id="rect2402" transform="rotate(-90)" d="M-28.604 10.528h9.75v8.2h-9.75z"/>
        <circle style="fill:#000;fill-opacity:0;stroke:#000;stroke-width:.497065;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" id="path2812" cx="-24.121" cy="4.262" r="2.081" transform="rotate(-90)"/>
        <g id="g34655">
          <path id="rect13167" style="fill:#009100;fill-opacity:1;stroke:none;stroke-width:.391382;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M2.675 32.159h14.15v-2.7H2.675Zm1.194-1.35a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0zm2.54 0a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0zm2.54 0a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0zm2.54 0a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0zm2.541 0a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0z"/>
          <path id="path13191-89-3-8" style="fill:#decd04;fill-opacity:1;stroke:none;stroke-width:.200283;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M3.87 30.809a.8.8 0 0 0 .8.8.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8zm.4 0a.4.4 0 0 1 .4-.4.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4z"/>
          <path id="path13191-8-6-3-8" style="fill:#decd04;fill-opacity:1;stroke:none;stroke-width:.200283;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M6.41 30.809a.8.8 0 0 0 .8.8.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8zm.4 0a.4.4 0 0 1 .4-.4.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4z"/>
          <path id="path13191-83-4-8-8" style="fill:#decd04;fill-opacity:1;stroke:none;stroke-width:.200283;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M8.95 30.809a.8.8 0 0 0 .8.8.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8zm.4 0a.4.4 0 0 1 .4-.4.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4z"/>
          <path id="path13191-1-3-6-9" style="fill:#decd04;fill-opacity:1;stroke:none;stroke-width:.200283;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M11.49 30.809a.8.8 0 0 0 .8.8.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8zm.4 0a.4.4 0 0 1 .4-.4.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4z"/>
          <path id="path13191-1-3-6-0-7" style="fill:#decd04;fill-opacity:1;stroke:none;stroke-width:.200283;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" d="M14.03 30.809a.8.8 0 0 0 .8.8.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8zm.4 0a.4.4 0 0 1 .4-.4.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4z"/>
          <path style="fill:#009100;fill-opacity:0;stroke:none;stroke-width:.352999;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.242485;paint-order:markers fill stroke" id="rect12629" transform="rotate(-90)" d="M-31.67 2.316h3v15.302h-3z"/>
        </g>
        <text xml:space="preserve" style="font-size:6.37003px;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:1.6854;user-select: none;" x="9.694" y="13.11" id="value"><tspan id="tspan24210" style="text-align:center;text-anchor:middle;stroke-width:1.6854" y="13.11" x="9.694">XXXXX</tspan></text>
      </g>
    </g>
  </svg>  
`;

}