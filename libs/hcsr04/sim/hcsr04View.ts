/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {
  // For the intructions
  export function mkHCSR04(xy: Coord = [0, 0]): SVGElAndSize {
    let [x, y] = xy;
    let l = x;
    let t = y;
    let w = HCSR04_PART_WIDTH;
    let h = HCSR04_PART_HEIGHT;
    let img = <SVGGElement>svg.elt("image");
    svg.hydrate(img, {
      class: "sim-MHZ19B",
      x: l,
      y: t,
      width: w,
      height: h,
      href: svg.toDataUri(HCSR04_PART),
    });

    return { el: img, x: l, y: t, w: w, h: h };
  }

  export class HCSR04View implements IBoardPart<HCSR04State> {
    style: string;
    element: SVGElement;
    defs: SVGElement[];
    image: SVGSVGElement;

    private text_value: SVGTextElement;
    private handle: SVGGElement;
    private ruler: SVGRectElement;

    private part: SVGElAndSize;
    private bus: EventBus;

    private state: HCSR04State;

    private is_handle_selected: boolean = false;
    private last_y: number = 0;

    constructor() {}

    public init(
      bus: EventBus,
      state: HCSR04State,
      svgEl: SVGSVGElement,
      otherParams: Map<string>
    ): void {
      this.state = state;
      this.bus = bus;

      this.state.setDistance(40);

      this.initDom();
      this.updateState();
    }

    initDom() {
      this.element = svg.elt("g");
      this.image = new DOMParser()
        .parseFromString(HCSR04_PART, "image/svg+xml")
        .querySelector("svg") as SVGSVGElement;

      svg.hydrate(this.image, {
        class: "sim-HCSR04",
        width: HCSR04_PART_WIDTH,
        height: HCSR04_PART_HEIGHT,
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
      });

      document.addEventListener("mouseup", () => {
        this.is_handle_selected = false;
        this.last_y = 0;
      });

      document.addEventListener("mousemove", (event) => this.moveHandle(event));
    }

    public moveToCoord(xy: Coord) {
      translateEl(this.element, [xy[0], xy[1]]);
    }

    public updateTheme() {}

    public updateState() {
      this.text_value.innerHTML = this.state.getDistance(4).toString() + " mm";
    }

    public moveHandle(event: MouseEvent) {
      if (!this.is_handle_selected) {
        return;
      }

      let point: SVGPoint = this.image.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      point = point.matrixTransform(this.image.getScreenCTM().inverse());

      let offset =
        point.y - this.ruler.y.baseVal.value - this.ruler.height.baseVal.value;
      offset = Math.max(-this.ruler.height.baseVal.value, Math.min(0, offset));

      this.handle.setAttribute("transform", `translate(0 ${offset})`);
      this.state.setDistance(
        Math.round((2960 * (-1 * offset)) / this.ruler.height.baseVal.value) +
          40
      );
      this.updateState();
    }
  }

  const HCSR04_PART_WIDTH = 250;
  const HCSR04_PART_HEIGHT = 145.07;

  const HCSR04_PART = `<svg width="250" height="145.07" viewBox="0 0 75 38.383" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <radialGradient id="b" cx="276.31" cy="-89.243" r="38.73" gradientUnits="userSpaceOnUse" xlink:href="#h"/>
      <radialGradient id="g" cx="377.55" cy="9.102" r="6.131" gradientTransform="matrix(.13614 0 0 .27228 -267.3 192.45)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
      <radialGradient id="f" cx="377.55" cy="9.102" r="6.131" gradientTransform="matrix(.13614 0 0 .27228 -264.24 192.45)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
      <radialGradient id="e" cx="377.55" cy="9.102" r="6.131" gradientTransform="matrix(.13614 0 0 .27228 -261.17 192.45)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
      <radialGradient id="d" cx="377.55" cy="9.102" r="6.131" gradientTransform="matrix(.13614 0 0 .27228 -258.1 192.45)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
      <linearGradient id="a">
        <stop stop-color="#d6d6d6" offset="0"/>
        <stop stop-color="#aaa" offset="1"/>
      </linearGradient>
      <linearGradient id="h">
        <stop stop-color="#777" offset="0"/>
        <stop stop-color="#b9b9b9" offset="1"/>
      </linearGradient>
      <pattern id="c" width="2" height="2" patternTransform="scale(10)" patternUnits="userSpaceOnUse">
        <path d="M0 0h1v1H0zm1 1h1v1H1z"/>
      </pattern>
    </defs>
    <rect x="12.869" y="31.636" width="39.688" height="6.615" ry="3.307" fill-opacity=".504" stroke="#fff" stroke-width=".265"/>
    <text id="value" x="32.401" y="37.105" fill="#fff" font-family="monospace" font-size="7.056" stroke-width=".265" xml:space="preserve"><tspan x="32.401" y="37.105" text-anchor="middle">3000 mm</tspan></text>
    <g transform="translate(-177.67 197.59)">
      <rect transform="scale(-1)" x="-243.82" y="166.8" width="66.146" height="30.791" rx="0" ry="0" fill="#456f93"/>
      <path d="m221.34-175.46-4.313 4.313v-4.591l-4.326-4.327v-14.909m-3.091.194v3.636l1.419 1.419v18.373l-3.787-2.187-6.97-6.97" fill="none" stroke="#355a7c" stroke-width="1.261"/>
      <g transform="rotate(180 134.115 -96.845) scale(.13614)">
        <circle cx="276.31" cy="-89.147" r="92.979" fill="#dcdcdc"/>
        <circle cx="276.31" cy="-89.147" r="77.446" fill="#222"/>
        <circle cx="276.31" cy="-89.147" r="59.733" fill="#777" fill-opacity=".992"/>
        <circle cx="276.31" cy="-89.243" r="38.73" fill="url(#b)"/>
        <circle cx="276.41" cy="-89.243" r="2.987" fill="#777" fill-opacity=".818"/>
        <circle cx="276.31" cy="-89.147" r="59.733" fill="url(#c)" opacity=".397"/>
      </g>
      <g transform="rotate(180 114.15 -96.845) scale(.13614)">
        <circle cx="276.31" cy="-89.147" r="92.979" fill="#dcdcdc"/>
        <circle cx="276.31" cy="-89.147" r="77.446" fill="#222"/>
        <circle cx="276.31" cy="-89.147" r="59.733" fill="#777" fill-opacity=".992"/>
        <circle cx="276.31" cy="-89.243" r="38.73" fill="url(#b)"/>
        <circle cx="276.41" cy="-89.243" r="2.987" fill="#777" fill-opacity=".818"/>
        <circle cx="276.31" cy="-89.147" r="59.733" fill="url(#c)" opacity=".397"/>
      </g>
      <circle transform="scale(-1)" cx="-180.05" cy="168.95" r="1.469" fill="#fff" stroke="#505132" stroke-linecap="round" stroke-linejoin="round" stroke-width=".54"/>
      <circle transform="scale(-1)" cx="-180.05" cy="195.44" r="1.469" fill="#fff" stroke="#505132" stroke-linecap="round" stroke-linejoin="round" stroke-width=".54"/>
      <circle transform="scale(-1)" cx="-241.72" cy="168.95" r="1.469" fill="#fff" stroke="#505132" stroke-linecap="round" stroke-linejoin="round" stroke-width=".54"/>
      <circle transform="scale(-1)" cx="-241.72" cy="195.44" r="1.469" fill="#fff" stroke="#505132" stroke-linecap="round" stroke-linejoin="round" stroke-width=".54"/>
      <rect transform="scale(-1)" x="-218.67" y="167.72" width="15.099" height="6.084" ry="3.042" fill="#878787" stroke="#424242" stroke-linecap="round" stroke-linejoin="round" stroke-width=".54"/>
      <rect transform="scale(-1)" x="-216.74" y="193.26" width="1.669" height="3.339" ry=".835" fill="url(#g)"/>
      <rect transform="scale(-1)" x="-213.67" y="193.26" width="1.669" height="3.339" ry=".835" fill="url(#f)"/>
      <rect transform="scale(-1)" x="-210.6" y="193.26" width="1.669" height="3.339" ry=".835" fill="url(#e)"/>
      <rect transform="scale(-1)" x="-207.54" y="193.26" width="1.669" height="3.339" ry=".835" fill="url(#d)"/>
      <text transform="scale(-1)" x="-218.157" y="178.502" fill="#e6e6e6" font-family="monospace" font-size="3.238" letter-spacing="0" stroke-width=".081" word-spacing="0" style="line-height:1.25" xml:space="preserve"><tspan x="-218.157" y="178.502" font-family="'Sony Fixed'">HC-SR04</tspan></text>
      <text transform="rotate(90)" x="-192.657" y="-215.064" fill="#e6e6e6" font-family="'Sony Fixed'" font-size="2.279" letter-spacing="0" stroke-width=".057" word-spacing="0" style="line-height:1.25" xml:space="preserve"><tspan x="-192.657" y="-215.064" style="line-height:1.35">Vcc</tspan><tspan x="-192.657" y="-211.988" style="line-height:1.35">Trig</tspan><tspan x="-192.657" y="-208.912" style="line-height:1.35">Echo</tspan><tspan x="-192.657" y="-205.835" style="line-height:1.35">Gnd</tspan></text>
      <text transform="scale(-1)" x="-238.598" y="195.678" fill="#e6e6e6" font-family="monospace" font-size="3.238" letter-spacing="0" stroke-width=".081" word-spacing="0" style="line-height:1.25" xml:space="preserve"><tspan x="-238.598" y="195.678" font-family="'Sony Fixed'">T</tspan></text>
      <text transform="scale(-1)" x="-185.028" y="195.678" fill="#e6e6e6" font-family="monospace" font-size="3.238" letter-spacing="0" stroke-width=".081" word-spacing="0" style="line-height:1.25" xml:space="preserve"><tspan x="-185.028" y="195.678" font-family="'Sony Fixed'">R</tspan></text>
    </g>
    <linearGradient id="sliderGradient" x1=".5" y1="1" x2=".5" y2="0">
      <stop offset="0%" stop-color="#456f93"/>
      <stop offset="100%" stop-color="#355a7c"/>
    </linearGradient>
    <rect style="fill:url(#sliderGradient);fill-opacity:1;stroke:#000;stroke-width:.0974468;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="ruler" width="1.5" height="30" x="70" y="5" ry=".75"/>
    <g id="handle">
      <circle style="fill:#636363;fill-opacity:1;stroke:#000;stroke-width:.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="path2812-5" cx="70.75" cy="35" r="2"/>
      <rect style="fill:#fff;fill-opacity:1;stroke:none;stroke-width:.127221;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect21476-0" width="2.5" height=".2" x="69.5" y="35" ry=".057" rx=".049"/>
      <rect style="fill:#fff;fill-opacity:1;stroke:none;stroke-width:.127221;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect21476-0-5" width="2.5" height=".2" x="69.5" y="34.4" ry=".057" rx=".049"/>
      <rect style="fill:#fff;fill-opacity:1;stroke:none;stroke-width:.127221;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect21476-0-9" width="2.5" height=".2" x="69.5" y="35.6" ry=".057" rx=".049"/>
    </g>
  </svg>
  `;
}
